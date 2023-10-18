# 初始化git hook
<code>npm run inithook</code>

# 开发
<code>npm run dev</code>

# 打包
<code>npm run build</code>

# 启动mock服务器
<code>npm run mock</code>

# 全量代码检测
<code>npm run lint</code>

# 代码fix
<code>npm run lint-fix</code>

# 配置antd主题
1. 打开scripts/utils/index.js
2. 在如下提示处添加less变量

```js
lessOptions: {
        javascriptEnabled: true,
        // antd组件库主题配置，配置的变量会覆盖antd组件库的样式
        modifyVars: {
            'primary-color': '#0D53DE',
            'link-color': '#0D53DE', // 链接色
            'success-color': '#00B365', // 成功色
            'warning-color': '#FF8800', // 警告色
            'error-color': '#F5483B', // 错误色
            'font-size-base': '14px', // 主字号
            'heading-color': '#121316', // 标题色
            'text-color': 'rgba(0, 0, 0, 0.80)', // 主文本色 #121316
            'text-color-secondary': 'rgba(0, 0, 0, 0.50)', // 次文本色
            'text-color-placeholder': 'rgba(0, 0, 0, 0.25)', // 表单占位
            'disabled-color': 'rgba(0, 0, 0, 0.20)', // 失效色
            'border-radius-base': '2px', // 组件/浮层圆角
            'border-radius-big': '4px', // 卡片圆角
            'border-color-divisionline': '#F4F5F9', // 分割线
            'border-color-line': '#EBECF0', // 描边
            // 继续添加
        },
    }
```
