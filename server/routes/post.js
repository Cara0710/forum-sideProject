const router = require("express").Router();
const Post = require("../models").postModel;
const Comment = require("../models").commentModel;

router.use((req, res, next) => {
  console.log("A request is coming in to post API.");
  next();
});

// 顯示所有貼文
router.get("/", (req, res) => {
  Post.find({})
    .populate("author", ["username"])
    .populate("comments")
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send("Post can not find.");
    });
});

// 顯示單一篇貼文頁面(包含留言)(用貼文id尋找)
router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Post.findOne({ _id })
    .populate("author", ["username"])
    .populate({
      path: "comments",
      populate: { path: "author", select: "username" },
    })
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send("Post can not find.");
    });
});

// 找到單一個留言
router.get("/comment/:_comment_id", async (req, res) => {
  let { _comment_id } = req.params;
  Comment.findOne({ _id: _comment_id })
    .populate("author", ["username"])
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send("Post can not find.");
    });
});

module.exports = router;
