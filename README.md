# tao-plugin

## 什么是 plugin
- 功能扩展

## 第一步
- `npm install`
- 配置 webpack config
- 新建 plugin 目录文件
- 新建 待转化的 md 文件
- 新建 接受内容的 html 文件
- 移步至第二步分支

## 第二步
- 实现 plugin
- 实现 MdToHtmlPlugin class
- constructor 接收配置
- apply 编写逻辑
- 移步至第三步分支

## 第三步
- 实现 compileHTML md to html 的逻辑
- 转化 # 为树形结构
- 转化 ul ol 为树形结构
- 使用时间戳作为标签标识
- `npm run build`
- `dist/test.html` 打开查看结果
