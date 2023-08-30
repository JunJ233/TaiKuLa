# TaiKuLa

# NPM分析工具-泰酷辣对不队

# 一、项目介绍

基于"Vue3+Vite+Element-Plus"前端开发框架+"Node.js运行平台"

队伍名：泰酷辣对不队
GitHub地址：[https://github.com/JunJ233/TaiKuLa/edit/maste](https://github.com/JunJ233/TaiKuLa)

# 二、项目实现

## 2.1技术选型与相关开发文档

本项目包含vue3框架+element-plus组件库+vite脚手架作为前端渲染的页面展示，后端数据处理主要使用javascript、d3渲染图库，echart渲染图库在node运行环境运行处理，使用vitest进行深度测试，使用eslint初始代码规范。

## 2.2.1架构设计

## 2.2.2架构图

## 2.3项目代码介绍

chart图标文件配置：

在chart.vue文件里，用了d3库里的stratify方法，对seriesDate进行处理，返回一个层次化的数据结构。seriesDate是chart.vue文件里initChart函数的第一个参数。还用了d3库的pack方法对displayRoot进行布局，并将布局结果保存在context.nodes中。

用了Echart,定义了一个echart.Tooltip实例，用于配置节点的提示信息，比如版本号，名字之类的。还定义了一个echart.Graph实例，用于设置图表的容器，宽度，高度，适应视图，布局等属性，并配置了默认节点，交互模式等

## 2.3.1技术栈

- vue3:提供html、css、javascript的框架服务,具备双向绑定的功能，绑定实时数据与elementui的组件库和交互式的渲染起到了关键作用
- Element-Plus：提供UI组件库，美化组件，搭配vue3使用能快速搭建NPM包的页面设计
- vite：运行打包效率高，对整体文件打包速度相较于webpack更快，使用vue3+element-plus+vite更快的部署前端的整体开发环境。作为脚手架搭建了vue3和eslint等工具，自动部署规范
- node:使用node命令行创建了该npm包的命令行，用封装函数将npm run dev进行封装可以自动启动vue,然后将命令行进行修改，支持-d查询深度后可以启动vue来查看依赖关系:node main.js dependency -d 2
支持-d -j来保存json文件，因为要保存文件就需要指定深度，而且不会启动vue,只会保存文件： node main.js  generate -d 2 -j b.json

- d3:使用d3来渲染svg的层次图
- echart:获取DOM节点，得到一个容器，放置图标，通过echarts.init(chartDom)初始化，输入dom节点，得到一个Echart的实例。操作点击层次图来查看层次结构
- eslint:作为代码检查工具，在初始代码库的时候可以确定JavaScript、vue、等代码的统一规范
- viteset:作为在开发时用来测试深度和保存的功能的可行性。
- javascript:通过javascript完成页面路由的跳转，并能完成查看package.json的深度以及保存查询package.json深度后的文件的功能

- commander: 使用commander模块化创建命令行node main.js  generate -d 2 -j b.json。

## 2.3.2目录介绍：

| 目录 | 子目录 | 子子目录 | 子子子目录 | 说明 | 备注 |
| --- | --- | --- | --- | --- | --- |
| .eslintrc.js |  |  |  | 初始自动化检查代码规范 |  |
| index.html |  |  |  | 根目录 |  |
| main.js |  |  |  | 主要的操作文件js |  |
| package-lock.json |  |  |  | 所定的package的配置安装json包 |  |
| package.json |  |  |  | package包配置 |  |
| vite.config.js |  |  |  | vite的配置 |  |
| yarn.lock |  |  |  | yarn的配置 |  |
| b.json |  |  |  | node后形成的依赖文件 |  |
| public | vite.svg |  |  | svg渲染图文件 |  |
| src | assets | data | targetFilePath.json | 目标渲染文件 |  |
| src | assets | logo.png |  | logo的图片 |  |
| src | components | Charts.vue |  | 依赖渲染的图标文件 | 包含渲染的依赖图 |
| src | routes | index.js |  | vue渲染的路由文件 | 页面路由的跳转 |
| src | utils | getChartData.js |  | 获取图标的数据 |  |
| src | views | DataDisplay.vue |  | 渲染图标的页面 | 包含渲染的依赖图形操作 |
| src | views | MainViews.vue |  | 主要的搜索页面和展示所有依赖页面 |  |
| src | App.vue |  |  | 主要挂载vue页面 |  |
| src | main.js |  |  | 主要的vue的入口 |  |
| src | style.css |  |  | 主要css的文件配置 |  |

# 3.1功能测试

|        功能项 |      功能需求 |        测试点 |          模块 |          结果  |
| --- | --- | --- | --- | --- |
| 搜索模块 | 开发者观察 | 按开发者所需依赖来观察 | 按需搜索依赖观察 | 正常运行 |
| 深度模块 | 开发者需求 | 支持开发者按所需深度可视化查看依赖 | 按需深度展示依赖 | 正常运行 |
| 保存模块 | 开发者需求 | 支持开发者根据深度保存下来所需依赖 | 按需深度保存依赖 | 正常运行 |
| 路由跳转模块 | 页面跳转需求 | 通过按钮实现路由的跳转 | 按需跳转页面关系 | 正常运行 |
| 依赖展开 | 开发者观察深层依赖 | 支持开发者观察深层的依赖 | 按需观察依赖内部的依赖关系 | 正常运行 |

## 3.1.1：不打开浏览器，通过命令行根据所需深度后保存文件功能

<img width="595" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 08 20" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/9a447a34-b326-4385-85c2-2713ae92e464">
<img width="279" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 08 44" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/be285aa1-05ca-444e-84d3-1a632ca20ebf">

## 3.1.2:使用命令行根据所需深度打开浏览器并显示内容：
<img width="476" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 10 32" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/f660b141-b473-4a3d-8d6c-33e97a99f275">
<img width="1245" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 11 26" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/be4a7f7b-adad-4451-8607-8b8868773935">

<img width="1245" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 11 52" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/902d5036-4d49-46e2-a9b2-965d264764f7">


## 3.1.3:通过搜索d3展示细致的依赖关系：
![3681693382605_ pic](https://github.com/JunJ233/TaiKuLa/assets/109939759/26013a2f-be6d-4a1d-9f70-39953561fc24)

<img width="1245" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 11 52" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/13049b34-6445-4bdf-8656-f0d3b59dbb5f">
<img width="1245" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 12 02" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/4c7e0f24-aa09-4c04-9d01-2efffed31345">
<img width="1245" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 12 06" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/0e28f729-56dc-4900-b732-72783050e1c3">
<img width="1245" alt="%E6%88%AA%E5%B1%8F2023-08-30%2008 12 13" src="https://github.com/JunJ233/TaiKuLa/assets/109939759/b17cfe71-9ebf-465d-a78c-85b59e7b98b8">
