"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployCommand = void 0;
const commander_1 = require("commander");
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
const handleFileSource = ({ url, // https://openmmlab-share.oss-cn-hangzhou.aliyuncs.com/deploy/gitlab-ci.yml
file }) => {
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
        }
        else if (file) {
            console.log(chalk.yellow(`[${path.basename(file)}] created from local template`));
            fs.readFile(file).then(bf => {
                resolve(bf.toString());
            }).catch(err => {
                reject(err);
            });
        }
        else {
            reject(new TypeError('[url] and [file] must be passed one'));
        }
    });
};
const getGitlabConfigContent = async (config) => {
    const { projectName, file, url } = config;
    let result = '';
    try {
        const gitlabCIUrlStr = await handleFileSource({ file, url });
        const gitlabCIUrlJSON = yaml.load(gitlabCIUrlStr);
        gitlabCIUrlJSON.variables.SERVICE_NAME = projectName;
        result = yaml.dump(gitlabCIUrlJSON);
    }
    catch (error) {
        console.error(error);
    }
    return result;
};
const getConfigContent = async (config) => {
    const { file, url } = config;
    let result = '';
    try {
        result = await handleFileSource({ file, url });
    }
    catch (error) {
        console.error(error);
    }
    return result;
};
const getIntegrityUrl = (url, filename) => {
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
    }
    catch (e) {
        console.error(e);
    }
};
const mainAction = async (projectName, options) => {
    if (checkFileExist())
        return;
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
const makeDeployCommand = () => {
    const deploy = new commander_1.Command('deploy');
    deploy
        .option('-fn, --filename', generateFilenameOption())
        .command('init')
        .option('-u, --url <url>', 'use tod fetch deploy file')
        .argument('<projectName>', 'projectName will be writed in ".gitlab-cli.yml". and rename "kube.yml"')
        .description('init project CI/CD config file')
        .action(mainAction);
    return deploy;
};
exports.makeDeployCommand = makeDeployCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2RlcGxveS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBb0M7QUFDcEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVuQyxNQUFNLGVBQWUsR0FBRztJQUNwQixLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsY0FBYztRQUN0QixNQUFNLEVBQUUsMkJBQTJCO0tBQ3RDO0lBQ0QsTUFBTSxFQUFFO1FBQ0osTUFBTSxFQUFFLFlBQVk7UUFDcEIsTUFBTSxFQUFFLFlBQVk7S0FDdkI7SUFDRCxNQUFNLEVBQUU7UUFDSixNQUFNLEVBQUUsZUFBZTtRQUN2QixNQUFNLEVBQUUsZ0JBQWdCO0tBQzNCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixNQUFNLEVBQUUsd0JBQXdCLENBQUMsbUJBQW1CO0tBQ3ZEO0NBQ0osQ0FBQztBQUVGLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtJQUN4QixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5GLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUks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