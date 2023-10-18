"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateCommand = exports.start = void 0;
const commander_1 = require("commander");
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
const figlet = require('figlet');
const chalk = require('chalk');
const shell = require('shelljs');
const { tryGitInit, tryGitCommit } = require('../utils/createGitRepo');
const { handlePrivateFileCopy } = require('../utils/create');
// 默认为普通项目模板
const TemplateTypeMap = {
    normal: 'mm-template',
    lib: 'mm-lib-template',
    vite: 'mm-template-vite'
};
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
const start = (appName, options) => {
    const { template } = options;
    console.log(template, Object.values(TemplateTypeMap).indexOf(template) > -1);
    // 展示欢迎信息
    if (template &&
        Object.values(TemplateTypeMap).indexOf(template) > -1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBb0M7QUFDcEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNyQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdkUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFN0QsWUFBWTtBQUNaLE1BQU0sZUFBZSxHQUFHO0lBQ3BCLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLEdBQUcsRUFBRSxpQkFBaUI7SUFDdEIsSUFBSSxFQUFFLGtCQUFrQjtDQUMzQixDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUU7SUFDckMsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdB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