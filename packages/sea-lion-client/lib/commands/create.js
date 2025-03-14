"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateCommand = exports.start = void 0;
const commander_1 = require("commander");
const template_config_1 = require("../template.config");
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
    // 安装依赖
    console.log('npm install ....');
    spawn.sync('npm', ['install'], { stdio: 'inherit' });
    // 初始化 git 仓库
    let initializedGit = false;
    if (tryGitInit(appPath)) {
        initializedGit = true;
        console.log('Initialized a git repository.');
        // 先提交一次，确保 .git 目录完全创建好
        if (tryGitCommit(appPath)) {
            console.log('Created initial git commit.');
            // git 提交成功后再初始化 husky
            console.log('Initializing husky...');
            spawn.sync('npm', ['run', 'prepare'], { stdio: 'inherit' });
        }
    }
    // console.log('创建完成，进入项目后请先执行 ' + chalk.green('npm run inithook'));
    console.log('详情查看readme');
    console.log(chalk.bgCyan('Finish! Happy hacking!'));
};
/**
 * @returns Promise<Object>  { templateType: 'normal' }
 */
const prompt = () => {
    const repos = Object.values(template_config_1.TemplateTypeMap);
    return inquirer.prompt([
        {
            type: 'list',
            default: template_config_1.TemplateTypeMap.normal,
            name: 'templateType',
            message: '选择创建项目的类型',
            choices: repos
        }
    ]);
};
const start = (appName, options) => {
    const { template } = options;
    // 展示欢迎信息
    if (template &&
        Object.values(template_config_1.TemplateTypeMap).indexOf(template) > -1) {
        create(appName, template);
        return;
    }
    figlet('^ SeaLion Client ^', async (err, data) => {
        if (err) {
            console.dir(err);
        }
        console.log(chalk.blue(data));
        const templateInfo = await prompt().catch(() => {
            process.exit(1);
        });
        if (!appName) {
            chalk.red('请输入app name!');
            chalk.white('请重新执行slc create <app name>');
            process.exit(1);
        }
        create(appName, templateInfo.templateType);
    });
};
exports.start = start;
// 组件是通用模块的一部分
const makeCreateCommand = () => {
    const c = new commander_1.Command('create');
    c.argument('<app-name>', 'a project name')
        .option('-t, --template <templateName>', 'input template name, such as mm-template, mm-lib-template, mm-template-vite')
        .description('create a project name')
        .action(exports.start);
    return c;
};
exports.makeCreateCommand = makeCreateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBb0M7QUFDcEMsd0RBQXFEO0FBQ3JELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTdEOzs7R0FHRztBQUNILE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFO0lBQ3JDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDdEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMs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