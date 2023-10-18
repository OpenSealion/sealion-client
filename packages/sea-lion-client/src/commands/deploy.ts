import { Command } from 'commander';
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const yaml = require('js-yaml');
const request = require('request');

const ConfigFileNames = {
    nginx: {
        source: 'default.conf',
        target: 'nginx/conf.d/default.conf'
    },
    docker: {
        source: 'dockerfile',
        target: 'Dockerfile'
    },
    gitlab: {
        source: 'gitlab-ci.yml',
        target: '.gitlab-ci.yml'
    },
    kube: {
        source: 'template.kube.yml',
        target: '[projectName].kube.yml' // 会根据projectName生成
    }
};

const checkFileExist = () => {
    const needCheckFileNames = Object.values(ConfigFileNames).map(item => item.target);

    const exitFile = needCheckFileNames.find(file => fs.pathExistsSync(path.join(process.cwd(), file)));

    if (exitFile) {
        console.log(chalk.red(`error: "${exitFile}" exist, please delete it first!`));
        return true;
    }
    return false;
};

// 通过路径或者url，获取文件内容
const handleFileSource = ({
    url, // https://openmmlab-share.oss-cn-hangzhou.aliyuncs.com/deploy/gitlab-ci.yml
    file
}: {
    url?: string;
    file?: string;
}): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        if (url) {
            console.log(chalk.yellow(`[${path.basename(file)}] created from remote template`));
            request.get({
                url,
                headers: {
                    Accept: 'text/*'
                }
            }, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                resolve(body);
            });
        } else if (file) {
            console.log(chalk.yellow(`[${path.basename(file)}] created from local template`));
            fs.readFile(file).then(bf => {
                resolve(bf.toString());
            }).catch(err => {
                reject(err);
            });
        } else {
            reject(new TypeError('[url] and [file] must be passed one'));
        }
    });
};

interface getConfigHandleParams {
    projectName?: string;
    file?: string;
    url?: string;
}

const getGitlabConfigContent = async (config: getConfigHandleParams): Promise<string> => {
    const { projectName, file, url } = config;
    let result = '';

    try {
        const gitlabCIUrlStr = await handleFileSource({ file, url });
        const gitlabCIUrlJSON = yaml.load(gitlabCIUrlStr);
        gitlabCIUrlJSON.variables.SERVICE_NAME = projectName;
        result = yaml.dump(gitlabCIUrlJSON);
    } catch (error) {
        console.error(error);
    }
    return result;
};

const getConfigContent = async (config: getConfigHandleParams): Promise<string> => {
    const { file, url } = config;
    let result = '';

    try {
        result = await handleFileSource({ file, url });
    } catch (error) {
        console.error(error);
    }
    return result;
};

const getIntegrityUrl = (url: string, filename: string): string => {
    return url ? `${url}/${filename}` : undefined;
};

const writeCurrentProject = async (projectName, url) => {
    const templateDir = path.resolve(__dirname, '../template/deploy-template');
    const targetDir = process.cwd();
    const gitlabConfigContent = await getGitlabConfigContent({
        projectName,
        url: getIntegrityUrl(url, ConfigFileNames.gitlab.source),
        file: path.join(templateDir, ConfigFileNames.gitlab.source)
    });

    const nginxConfigContent = await getConfigContent({
        url: getIntegrityUrl(url, ConfigFileNames.nginx.source),
        file: path.join(templateDir, ConfigFileNames.nginx.source)
    });

    const dockerConfigContent = await getConfigContent({
        url: getIntegrityUrl(url, ConfigFileNames.docker.source),
        file: path.join(templateDir, ConfigFileNames.docker.source)
    });

    const kubeConfigContent = await getConfigContent({
        projectName,
        url: getIntegrityUrl(url, ConfigFileNames.kube.source),
        file: path.join(templateDir, ConfigFileNames.kube.source)
    });

    try {
        fs.writeFileSync(path.join(targetDir, ConfigFileNames.gitlab.target), gitlabConfigContent);
        // nginx 放在文件夹下，先创建文件夹
        const nginxPath = path.join(targetDir, ConfigFileNames.nginx.target);
        fs.ensureDirSync(path.dirname(nginxPath));
        fs.writeFileSync(nginxPath, nginxConfigContent); // todo 创建nginx需要的文件夹
        fs.writeFileSync(path.join(targetDir, ConfigFileNames.docker.target), dockerConfigContent);
        fs.writeFileSync(path.join(targetDir, `${projectName}.kube.yml`), kubeConfigContent);
        console.log(chalk.green('Created success!'));
    } catch (e) {
        console.error(e);
    }
};

const mainAction = async (projectName, options) => {
    if (checkFileExist()) return;
    const { url } = options;
    writeCurrentProject(projectName, url);
};

// .gitlab-cli.yml openxlab和其他略有不同会略有不同，
// dockerfile镜像都相同
// nginx config 提供基础模板
// template.kube.yml 转换成 projectname.kube.yml

const generateFilenameOption = () => {
    const ConfigFileItems = Object.values(ConfigFileNames);
    return `有四个配置文件\n源文件名分别是:\n${ConfigFileItems.map((item, index) => `${index + 1}.${item.source}`).join('\n')};
    \n生成的文件名是:\n${ConfigFileItems.map((item, index) => `${index + 1}.${item.target}`).join('\n')}`;
};

export const makeDeployCommand = () => {
    const deploy = new Command('deploy');

    deploy
        .option('-fn, --filename', generateFilenameOption())
        .command('init')
        .option('-u, --url <url>', 'use tod fetch deploy file')
        .argument('<projectName>', 'projectName will be writed in ".gitlab-cli.yml". and rename "kube.yml"')
        .description('init project CI/CD config file')
        .action(mainAction);

    return deploy;
};
