const express = require("express");
// 创建express服务器
const app = express();

const path = require("path");
//解析html
var ejs = require("ejs");
var config = require("./config/default");
const exp = require("constants");

//获取静态路径
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/data"));

//设置允许跨域
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  res.header("Content-type", "application/json;charset=utf-8");
  if (req.method.toLowerCase() == "options")
    res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

//加入html视图
app.engine("html", ejs.__express);
app.set("view engine", "html");

//解析前端数据 有了它可以通过res.body获取数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//引入路由

require("./routes/index")(app);
require("./routes/files")(app);

//监听项目端口 config.port
app.listen(config.port, () => {
  console.log(`我启动了端口${config.port}`);
});
