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

# 3.1功能测试

## 不打开浏览器，通过命令行根据所需深度后保存文件功能

![截屏2023-08-30 08.08.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b89a38b-e6b6-4ae0-a031-a659a687bd1f/%E6%88%AA%E5%B1%8F2023-08-30_08.08.20.png)

![截屏2023-08-30 08.08.44.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2c4a9347-e735-4a54-adaf-c34948be3d36/%E6%88%AA%E5%B1%8F2023-08-30_08.08.44.png)

## 使用命令行根据所需深度打开浏览器并显示内容：

![截屏2023-08-30 08.10.32.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/565b198f-2127-4ab4-9421-57184accd9fd/%E6%88%AA%E5%B1%8F2023-08-30_08.10.32.png)

![截屏2023-08-30 08.11.11.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f916488-8ab5-4a06-b07b-b954345adb11/%E6%88%AA%E5%B1%8F2023-08-30_08.11.11.png)

![截屏2023-08-30 08.11.26.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/64566aea-cd87-428a-84e5-70622fb25f3d/%E6%88%AA%E5%B1%8F2023-08-30_08.11.26.png)

![截屏2023-08-30 08.11.52.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8a77cae9-5e0a-4303-9555-1b14308f0bad/%E6%88%AA%E5%B1%8F2023-08-30_08.11.52.png)

![截屏2023-08-30 08.12.02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aaa65080-509f-48dc-b872-c6b4a38cd140/%E6%88%AA%E5%B1%8F2023-08-30_08.12.02.png)

![截屏2023-08-30 08.12.06.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f2853d11-e503-40e8-af63-43bd59f62552/%E6%88%AA%E5%B1%8F2023-08-30_08.12.06.png)

![截屏2023-08-30 08.12.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff6db238-ba7b-4c08-8424-3fc5795c2035/%E6%88%AA%E5%B1%8F2023-08-30_08.12.13.png)

# 3.2性能测试

通过按需引入的方式
