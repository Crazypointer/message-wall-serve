const config = {
  //启动的端口号
  port: 3000,
  database: {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "12345678",
    //数据库名
    DATABASENAME: "swalls",
  },
};
//暴露出去
module.exports = config;
