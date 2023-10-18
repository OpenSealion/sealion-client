## 介绍
<p>前端物料构建工具，支持构建项目、组件和ci/cd配置文件,该项目由一个构建工具和四个模板组成。</p>

## 命令
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

# 模板

<table>
   <tbody>
    <tr>
        <td>模板名(即包名)</td>
        <td>功能</td>
        <td>其它</td>
    </tr>
    <tr>
        <td>@sea-lion/app-vite-template</td>
        <td>使用vite构建的项目开发环境</td>
        <td>创建项目推荐使用</td>
    </tr>
    <tr>
        <td>@sea-lion/lib-template</td>
        <td>使用rollup构建的库开发环境</td>
        <td></td>
    </tr>
    <tr>
        <td>@sea-lion/app-template</td>
        <td>使用webpack5构建的项目开发环境</td>
        <td>可能会有依赖包版本冲突，不推荐</td>
    </tr>
   </tbody> 
</table>

