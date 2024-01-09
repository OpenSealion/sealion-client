
# 1.介绍
<p>前端物料构建工具，支持构建项目、组件和ci/cd配置文件,该项目由一个构建工具和四个模板组成。</p>

# 2.命令行工具
## 安装
```sh
# mac和ubuntu需要加sudo
npm install -g sea-lion-client
```

## 功能
```sh
# 查看版本0.1.4
slc -v

# 创建名为app1的项目名称
slc create app1

# 使用模板@sea-lion/app-template创建app2
# 模板值见下表
slc create app2 -t @sea-lion/app-vite-template

# 创建组件物料
cd ./src/components
slc g -c log-modal # 生成一个名为日志弹窗组件

# 创建当前项目的部署文件，
# 注意：需要在项目根目录执行，demo0.9.0作为传入参数，会导致两个结果，
# 其一生成demo.0.9.0.kub.yml;
# 其二，.gitlab-ci.yml的SERVICE_NAME的值会为demo0.9.0
slc deploy init demo0.9.0

# 创建当前项目的部署文件，
# 注意：需要在项目根目录执行，demo0.9.0作为传入参数，会导致两个结果，
# 其一，生成demo.0.9.0.kub.yml;
# 其二，.gitlab-ci.yml中SERVICE_NAME的值会为demo0.9.0
slc deploy init demo0.9.0 -u https://openmmlab-share.oss-cn-hangzhou.aliyuncs.com/deploy

# 查看模板和生成文件的对比
slc deploy init -fn
```

# 3.模板

<table>
   <tbody>
    <tr>
        <td>模板名(即包名)</td>
        <td>功能</td>
        <td>备注</td>
    </tr>
    <tr>
        <td><a href="https://www.npmjs.com/package/@sea-lion/app-template" target="_blank">@sea-lion/app-vite-template</a></td>
        <td>使用vite构建的项目开发环境</td>
        <td>创建项目推荐使用</td>
    </tr>
    <tr>
        <td><a href="https://www.npmjs.com/package/@sea-lion/app-template" target="_blank">@sea-lion/lib-template</a></td>
        <td>使用rollup构建的库开发环境</td>
        <td></td>
    </tr>
    <tr>
        <td><a href="https://www.npmjs.com/package/@sea-lion/app-template" target="_blank">@sea-lion/app-template</a></td>
        <td>使用webpack5构建的项目开发环境</td>
        <td>可能会有依赖包版本冲突，不推荐</td>
    </tr>
   </tbody> 
</table>

# 4.其它
当使用slc创建物料和项目时，slc首先会先对当前目录下的文件做检查，是否有重名文件，如果有就不会创建，避免覆盖。

# 5.开发
## 开发规范
<div>本项目存放脚手架工具和全套模板的代码，</div>
<div>开发前请创建自己的功能分支，合并请提mr。</div>

## 项目依赖安装
```sh
lerna bootstrap
```

## 本地运行
node packages/sea-lion-client/bin/sea-lion-client.js create [project-name]

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
<p>3. 更新cli中的package.json依赖，和sea-lion-client/src/template.config.ts中的代码，如下</p>

``` javascript
// 默认为普通项目模板
export const TemplateTypeMap = {
    normal: '@sea-lion/app-template',
    lib: '@sea-lion/app-vite-template',
    vite: '@sea-lion/lib-template'
};
```
<p>上面map维护了所有cli依赖的模板，也就是可供用户选择的模板，key值任意，value值对应模板的名字，注意，必须和package.json中的name一致</p>
<p>4. 进入sea-lion-client目录执行npm run build即可</p>

## 关于发布
```sh
> npm config set access public # scope package need
> lerna publish
```
