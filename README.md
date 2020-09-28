# 脚手架

自动从iconfont更新
npm icon 'iconfont下载链接后缀'

node >= 12.0.0

Taro >= v3.0.9

# 技术栈

React + Taro + Dva + Scss + typeScript

使用eslint+prettier格式化

默认git提交前校验（如不需要可在package.json里删掉pre-commit配置）

## 项目运行

```
# 安装项目依赖
yarn or npm or cpnm

# 微信小程序
npm run dev:weapp

# 支付宝小程序
npm run dev:alipay

# 百度小程序
npm run dev:swan

# 字节跳动小程序
npm run dev:tt

# QQ小程序
npm run dev:qq

# H5
npm run dev:h5

# React Native
npm run dev:rn

# pages模版快速生成
npm run temp `文件名`

```

# 项目结构

目录结构

    ├── .temp                  // H5编译结果目录
    ├── .rn_temp               // RN编译结果目录
    ├── dist                   // 小程序编译结果目录
    ├── config                 // Taro配置目录
    │   ├── dev.ts                 // 开发时配置
    │   ├── index.ts               // 默认配置
    │   └── prod.ts                // 打包时配置
    ├── src                    // 源码目录
    │   ├── components             // 组件
    │   ├── config                 // 项目开发配置
    │   ├── models                 // redux models
    │   ├── pages                  // 页面文件目录
    │   │   └── demo
    │   │       ├── models             // redux models
    │   │       ├── index.ts           // 页面逻辑
    │   │       ├── index.scss         // 页面样式
    │   │       ├── index.config.ts    // 页面配置
    │   │       ├── service.ts         // 页面接口
    │   ├── service            // 页面全局api等服务
    │   ├── static             // 字体、图片
    │   ├── utils              // 常用工具类
    │   ├── app.ts             // 入口文件
    │   ├── app.config.ts      // 入口配置文件
    │   └── index.html
    ├── package.json
    ├── template.js            // pages模版快速生成脚本,执行命令 npm run tpl `文件名`
    └── get-iconfont.js        // iconfont快速更新,执行命令 npm run iconfont


# 文档

### Taro开发文档

> https://nervjs.github.io/taro/docs/README.html

### dva开发文档地址

> https://dvajs.com/

### 小程序开发文档

> https://mp.weixin.qq.com/debug/wxadoc/dev/
