> 每个程序员都应该拥有一个属于自己的博客。

## 前言
一直以来都对开发博客情有独钟，这已经是v3.0了，一方面是享受开发的乐趣，另一方面是为了记录、分享工作&生活。

## 规划
总结前两个版本express+vue及nuxt+egg踩过的坑，对于v3.0，我列了几个构想：
- 服务端渲染
- ORM框架
- 工程化
- 自动化

对SSO有强需求的博客项目，客户端渲染的技术选型应该首先被pass，nuxt+egg足够优秀，只是对于个人项目来说，一个人要维护两份代码、两个服务并不是太友好。因此，v3.0，我采用koa2+模版引擎，服务端渲染的方案。

## 技术选型
- koa.js
- pug
- mysql
- sequelize.js
- travis
- nginx

## 目录结构
```
├── app
│   ├── controller          # 控制器（controller）层
│   ├── model               # sequelize模型
│   ├── service             # 服务（service）层
│   ├── views               # 视图、页面、模板
│   ├── app.js              # koa实例
│   ├── index.js            # 入口文件
│   └── router.js           # 路由
├── database
│   ├── migrations          # sequelize migrations
│   └── config.json         # 数据库配置
├── static                  # 静态资源
├── test                    # 测试用例
│   └── app.test.js
├── .babelrc                # babel配置
├── .eslintrc.js            # eslint配置
├── .gitignore              # gitignore
├── .sequelizerc            # sequelize配置
├── .travis.yml             # tranvis配置
├── index.js                # mian
├── README.md
├── id_rsa_travis
├── package.json
└── yarn.lock
```

## 说明介绍
比较常规的koa项目，app文件夹包括了整个koa实例，目录结构上如上一部分，主要区分controller、service、model、views、router等，controller负责处理简单的输入、输出，核心业务逻辑放在service层，model为各个模块的模型，views是输出的视图页面，router则为路由。

项目中还引入了Node.js ORM框架——sequelize，负责数据库的各种事务支持、关系关联、读取、复制、迁移等。

Eslint和自动化测试也都是工程化不可或缺的一环了，在git pre-push和pre-commit钩子中都会执行代码检测及单元测试脚本，确保不会将不完善的代码提交上去。

最后，通过travis实现自动化部署。当master分支代码有变动时，自动SSH到服务器上拉取项目最新代码、安装依赖、重启应用。

## Sequelize介绍
初始化数据库及Migrations
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS `charleyup.com`";
```

创建数据表
```bash
npx sequelize migration:generate --name=init-posts
```
执行完后会在`database/migrations`目录下生成一个 migration 文件(`${timestamp}-init-users.js`)，我们修改它来处理初始化`posts`表。

升级数据库
```bash
npx sequelize db:migrate
```

## 性能优化
TODO

## 总结
简单总结了下，demo代码可前往github查看，有任何问题欢迎邮件我讨论。
- [代码](https://github.com/charleyup/charleyup.com-demo)
- [成品展示](https://charleyup.com)
