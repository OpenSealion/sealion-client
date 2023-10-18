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
    console.log(template, Object.values(template_config_1.TemplateTypeMap).indexOf(template) > -1);
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