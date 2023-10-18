## 说明
本项目存放脚手架工具和全套模板的代码

## 开发规范
开发前请创建自己的功能分支，合并请提mr

## 项目依赖安装
lerna bootstrap

## 本地运行
node packages/create-mm-app/bin/create-mm-app.js create [project-name]

## 关于开发
### 现有模板维护
<p>由于cli项目使用单一库维护，所以模板和cli工具在一个git项目中维护</p>
<p>对于模板开发，目前的最佳实践是在本地用需要修改的模板创建一个项目，等项目修改完成后，再把代码copy到对应的脚手架代码</p>
<p>注意！template中的代码和实际创建的项目不是一一对应，</p>
<p>比如项目中的package.json对于xxx-template/template.json；</p>
<p>项目中的.gitignore和.npmrc对于xxx-template/template/gitignore和xxx-template/template/npmrc</p>
<p>其他的暂时都一一对应</p>
<p></p>

### 新模板
<p>1. 新模板开发需要开发者在本地开发好需要的项目环境，然后按照上面的现有模板的对应关系copy过去</p>
<p>2. 除此之外，还要提供一套方法供cli使用，可以参照xxx-template/scripts下的文件,并通过xxx-template/index.js和xxx-template/package.json导出</p>
<p>3. 更新cli中的package.json依赖，和create-mm-app/src/commands/create.ts中的代码，如下</p>

``` javascript
// 默认为普通项目模板
const TemplateTypeMap = {
    normal: 'mm-template',
    lib: 'mm-lib-template'
};
```
<p>上面map维护了所有cli依赖的模板，也就是可供用户选择的模板，key值任意，value值对应模板的名字，注意，必须和package.json中的name一致</p>
<p>4. 进入create-mm-app目录执行npm run build即可</p>

## 关于发布
lerna publish

## 使用文档
[mm-cli使用文档](https://aicarrier.feishu.cn/docx/doxcnhycCgdhqozV7yl1LIJdclc)

## 遗留功能
1. 优化维护成本
2. cicd还没配，目前发布需要手动执行命令
