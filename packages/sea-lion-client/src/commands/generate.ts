import { Command } from 'commander';
import { generateComponent } from './generate-component';
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const canGenerateModuleName = (fullPath: string): boolean => {
    // 模块名必须符合烤肉串命名法
    const reg = /^[a-z0-9-]+$/;
    const moduleName = path.basename(fullPath);
    if (!reg.test(moduleName)) {
        console.log(chalk.red(`[${moduleName}]不符合命名规则，模块名只能由小写字母，数字和-组成`));
        return false;
    }

    if (fs.existsSync(fullPath)) {
        console.log(chalk.red(`[${moduleName}]已存在，如需更新，请先手动删除`));
        return false;
    }

    return true;
};

const generateModuleName = (fullPath: string) => {
    const moduleName = path.basename(fullPath);
    const { entry, component, style } = generateComponent(moduleName);
    fs.ensureDirSync(fullPath);
    fs.writeFileSync(`${fullPath}/${entry.filename}`, entry.content);
    fs.writeFileSync(`${fullPath}/${component.filename}`, component.content);
    fs.writeFileSync(`${fullPath}/${style.filename}`, style.content);
    console.log(chalk.green(`${moduleName} created success`));
};

const mainAction = (options) => {
    const { component } = options;
    const fullPath = `${process.cwd()}/${component}`;
    if (canGenerateModuleName(fullPath)) {
        generateModuleName(fullPath);
    }
};

// 组件是通用模块的一部分
export const makeGCommand = () => {
    const g = new Command('g');

    g.option('-c, --component <componentName>', 'generate a component')
        .description('generate some common modules')
        .action(mainAction);

    return g;
};
