import { Command } from 'commander';
import { TemplateTypeMap } from '../template.config';
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
const figlet = require('figlet');
const chalk = require('chalk');
const shell = require('shelljs');
const { tryGitInit, tryGitCommit } = require('../utils/createGitRepo');
const { handlePrivateFileCopy } = require('../utils/create');

/**
 * @param {string} appName
 * @param {string} templateType normal|umi/lib
 */
const create = (appName, templateType) => {
    const { getTemplate } = require(templateType);
    const originalDir = process.cwd();
    const appPath = `${originalDir}${path.sep}${appName}`;
    if (fs.existsSync(appPath)) {
        console.log(chalk.red(`[error] 项目路径重复 ${appPath}`));
        return;
    }
    // Fetch project template to execute dir
    console.log('fetching template....');
    getTemplate(originalDir, appName);

    if (!fs.existsSync(appPath)) {
        console.log(chalk.red(`[error] 项目复制失败 ${appPath}`));
        return;
    }
    // 进入新建项目
    shell.cd(appPath);
    // spawn.sync('cd', [appPath]); 并不会立刻进入指定目录
    // copy private file
    handlePrivateFileCopy('.gitignore', 'gitignore', appPath);
    handlePrivateFileCopy('.npmrc', 'npmrc', appPath);

    // Initialize git repo
    let initializedGit = false;
    if (tryGitInit()) {
        initializedGit = true;
        console.log('Initialized a git repository.');
    }

    if (initializedGit && tryGitCommit(appPath)) {
        console.log('Created git commit.');
    }

    // 安装依赖
    console.log('npm install ....');
    spawn.sync('npm', ['install'], { stdio: 'inherit' });
    console.log('创建完成，进入项目后请先执行 ' + chalk.green('npm run inithook'));
    console.log('详情查看readme');
    console.log(chalk.bgCyan('Finish! Happy hacking!'));
};
/**
 * @returns Promise<Object>  { templateType: 'normal' }
 */
const prompt = () => {
    const repos = Object.values(TemplateTypeMap);
    return inquirer.prompt([
        {
            type: 'list',
            default: TemplateTypeMap.normal,
            name: 'templateType',
            message: '选择创建项目的类型',
            choices: repos
        }
    ]);
};

export const start = (appName, options) => {
    const { template } = options;
    console.log(template, Object.values(TemplateTypeMap).indexOf(template) > -1);
    // 展示欢迎信息
    if (
        template &&
        Object.values(TemplateTypeMap).indexOf(template) > -1
    ) {
        create(appName, template);
        return;
    }
    figlet('^ mm cli ^', async (err, data) => {
        if (err) {
            console.dir(err);
        }
        console.log(chalk.blue(data));

        const templateInfo = await prompt().catch(() => {
            process.exit(1);
        });

        if (!appName) {
            chalk.red('请输入app name!');
            chalk.white('请重新执行create-mm-app create <app name>');
            process.exit(1);
        }

        create(appName, templateInfo.templateType);
    });
};

// 组件是通用模块的一部分
export const makeCreateCommand = () => {
    const c = new Command('create');

    c.argument('<app-name>', 'a project name')
        .option('-t, --template <templateName>', 'input template name, such as mm-template, mm-lib-template, mm-template-vite')
        .description('create a project name')
        .action(start);

    return c;
};
