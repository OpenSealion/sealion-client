## 说明
本项目为sea-lion-client创建，主要用于开发工具库，支持ts、eslint检测和单元测试环境
项目安装时指向私有npm仓库，如果想用公网地址，可以Ctrl + C暂停安装，然后进入项目更改.npmrc文件

## 初始化git hook
项目安装后执行<code>npm run inithook</code>

## 开发
<code>npm run dev</code>

## 监听代码执行单元测试
<code>npm run test:watch</code>

## 打包
<code>npm run build</code>

## 监听文件测试
<code>npm run test:watch</code>

## 测试
<code>npm test</code>

## 发布
<code>npm publish</code>
如果发布到私有npm仓库，可以在package.json中设置地址
```json
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  }

```
## 规范
<p>1. 文件和文件夹命名全部用烤肉串（kebabCase）命名</p>
<p>2. react-router-dom提供的组件和自定义的layout，page组件可以根据需要组合</p>

## 文档
[sea-lion-client使用文档](https://aicarrier.feishu.cn/docx/doxcnhycCgdhqozV7yl1LIJdclc)

