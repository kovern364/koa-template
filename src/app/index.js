const Koa = require("koa");
const router = require("../router/index");
const path = require("path");
const views = require("koa-views");
const KoaStatic = require("koa-static");
const { koaBody } = require("koa-body");
const logger = require("koa-logger");
const app = new Koa();
const parameter = require("koa-parameter");
const errHandler = require("./errHandler");

app.use(logger());
app.use(koaBody());

app.use(views(path.join(__dirname, "../views"), { extension: "html" }));
app.use(KoaStatic(path.join(__dirname, "../static")));
app.use(parameter(app));

app.use(router.routes()).use(router.allowedMethods());

// 统一错误处理
app.on("error", errHandler);

module.exports = app;
