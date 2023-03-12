const dbModel = require("../lib/db");

//新建留言
exports.insertWall = async (req, res) => {
  let data = req.body;
  console.log(data);

  await dbModel
    .insertWall([
      data.type,
      data.message,
      data.name,
      data.userId,
      data.moment,
      data.label,
      data.color,
      data.imgurl,
    ])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};

//新建反馈
exports.insertFeedback = async (req, res) => {
  let data = req.body;
  console.log(data);

  await dbModel
    .insertFeedback([data.wallId, data.userId, data.type, data.moment])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};
//新建评论
exports.insertComment = async (req, res) => {
  let data = req.body;
  console.log(data);

  await dbModel
    .insertComment([
      data.wallId,
      data.userId,
      data.imgurl,
      data.moment,
      data.comment,
      data.name,
    ])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};
//删除墙 主表对应多条子表一起删除
exports.deleteWall = async (req, res) => {
  let data = req.body;
  //如果图片地址存在，删除对应图片
  // if (data.imgurl) {
  //   Mkdir;
  // }

  await dbModel.deleteWall(data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};
//删除反馈
exports.deleteFeedback = async (req, res) => {
  let data = req.body;
  console.log(data);

  await dbModel.deleteFeedback(data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};
//删除评论
exports.deleteComment = async (req, res) => {
  let data = req.body;
  console.log(data);

  await dbModel.deleteComment(data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};
//分页查询墙 type区分留言还是标签
exports.findwallPage = async (req, res) => {
  let data = req.body;
  console.log(data);

  await dbModel
    .findwallPage(data.page, data.pagesize, data.type, data.label)
    .then(async (result) => {
      //查找相应的wall的赞、举报、撤销数据
      //0 1 2对应喜欢 举报 撤销
      for (let i = 0; i < result.length; i++) {
        // 喜欢
        result[i].like = await dbModel.feedbackCount(result[i].id, 0);
        // 是否举报
        result[i].report = await dbModel.feedbackCount(result[i].id, 1);
        // 是否要求撤销
        result[i].dismiss = await dbModel.feedbackCount(result[i].id, 2);
        //是否点赞
        result[i].islike = await dbModel.likeCount(result[i].id, data.userId);
        //评论数
        result[i].comcount = await dbModel.commentCount(result[i].id);
      }
      res.send({
        code: 200,
        message: result,
      });
    });
};
//分页查询评论总数查询
exports.findCommentPage = async (req, res) => {
  let data = req.body;

  await dbModel
    .findCommentPage(data.page, data.pagesize, data.id)
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};
//评论总数查询
exports.commentCount = async (req, res) => {
  let data = req.body;

  await dbModel.commentCount(data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};
