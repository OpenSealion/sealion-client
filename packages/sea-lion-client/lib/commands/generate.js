"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGCommand = void 0;
const commander_1 = require("commander");
const generate_component_1 = require("./generate-component");
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const canGenerateModuleName = (fullPath) => {
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
const generateModuleName = (fullPath) => {
    const moduleName = path.basename(fullPath);
    const { entry, component, style } = (0, generate_component_1.generateComponent)(moduleName);
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
const makeGCommand = () => {
    const g = new commander_1.Command('g');
    g.option('-c, --component <componentName>', 'generate a component')
        .description('generate some common modules')
        .action(mainAction);
    return g;
};
exports.makeGCommand = makeGCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2VuZXJhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQW9DO0FBQ3BDLDZEQUF5RDtBQUN6RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUvQixNQUFNLHFCQUFxQixHQUFHLENBQUMsUUFBZ0IsRUFBVyxFQUFFO0lBQ3hELGdCQUFnQjtJQUNoQixNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUM7SUFDM0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUNuRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN6RCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFBLHNDQUFpQixFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RSxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUMzQixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQzlCLE1BQU0sUUFBUSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQ2pELElBQUkscUJBQXFCLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7QUFDTCxDQUFDLENBQUM7QUFFRixjQUFjO0FBQ1AsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO0lBQzdCLE1BQU0sQ0FBQyxHQUFHLElBQUksbUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUzQixDQUFDLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLHNCQUFzQixDQUFDO1NBQzlELFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQztTQUMzQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFeEIsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDLENBQUM7QUFSVyxRQUFBLFlBQVksZ0JBUXZCIn0=