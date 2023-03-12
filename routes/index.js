const controller = require("../controller/dbServe");

module.exports = function (app) {
  //test接口
  app.get("/test", (req, res) => {
    res.type("html");
    res.render("test");
  });
  //新建留言
  app.post("/insertwall", (req, res) => {
    controller.insertWall(req, res);
  });
  //新建反馈
  app.post("/insertfeedback", (req, res) => {
    controller.insertFeedback(req, res);
  });
  //新建评论
  app.post("/insertcomment", (req, res) => {
    controller.insertComment(req, res);
  });
  //删除墙
  app.post("/deleteWall", (req, res) => {
    controller.deleteWall(req, res);
  });
  //删除反馈
  app.post("/deleteFeedback", (req, res) => {
    controller.deleteFeedback(req, res);
  });
  //删除评论
  app.post("/deleteComment", (req, res) => {
    controller.deleteComment(req, res);
  });
  //分页查询墙
  app.post("/findwallPage", (req, res) => {
    controller.findwallPage(req, res);
  });
  //查询倒叙分页评论
  app.post("/findcommentPage", (req, res) => {
    controller.findCommentPage(req, res);
  });
  //查询各反馈总数据
  app.post("/feddbackCount", (req, res) => {
    controller.feddbackCount(req, res);
  });
  //评论总数查询
  app.post("/commentCount", (req, res) => {
    controller.commentCount(req, res);
  });
  //是否点赞
  app.post("/", (req, res) => {
    controller.likeCount(req, res);
  });
  //用户进行ip等级
  app.post("/signip", (req, res) => {
    var ip = req.ip;
    res.send({
      code: 200,
      ip: ip,
    });
  });
};
