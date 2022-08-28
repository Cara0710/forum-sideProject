const router = require("express").Router();
const Post = require("../models").postModel;
const Comment = require("../models").commentModel;
const postValidation = require("../validation").postValidation;
const commentValidation = require("../validation").commentValidation;

router.use((req, res, next) => {
  console.log("A request is coming in to postAuth API.");
  next();
});

// 找到用戶自己發的貼文
router.get("/:_user_id", (req, res) => {
  const { _user_id } = req.params;
  Post.find({ author: _user_id })
    .populate("author", ["username"])
    .populate("comments")
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send("Cannot get course data.");
    });
});

// 發新貼文
router.post("/", async (req, res) => {
  // 確認發文格式是否正確
  const { error } = postValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // 格式正確，新增發文
  const { title, description } = req.body;
  const newPost = new Post({
    title,
    description,
    author: req.user._id,
  });
  // 存進mongodb altas;
  try {
    const data = await newPost.save();
    const newdata = await Post.findOne({ _id: newPost._id }).populate(
      "author",
      ["username"]
    );
    res.status(200).send(newdata);
  } catch (err) {
    res.status(400).send("Cannot save post.");
  }
});

// 編輯貼文(只可以編輯自己發的貼文)(_post_id)
router.patch("/:_id", async (req, res) => {
  // 確認編輯貼文格式是否正確
  const { error } = postValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // 找尋貼文
  const { _id } = req.params;
  let post = await Post.findOne({ _id });
  if (!post) {
    res.status(404);
    return res.json({
      success: false,
      message: "Post not found.",
    });
  }

  // 只有自己才能編輯
  // 不能用 == 只能用equals()，因為在reference data type中，==是用來判斷兩個比較物件是不是有相同的 references
  // equals()可以判斷兩個有不同references的物件是否指向相同的值。
  if (post.author.equals(req.user._id)) {
    Post.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("author", ["username"])
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      })
      .then((updateData) => {
        res.send(updateData);
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    // 403 => 服務器成功解析請求但是客戶端沒有訪問該資源的權限
    res.status(403);
    return res.json({
      seccess: false,
      message: "Only author can edit the post.",
    });
  }
});

// 刪除文章(_post_id)
router.delete("/:_id", async (req, res) => {
  // 找尋貼文
  const { _id } = req.params;
  let post = await Post.findOne({ _id });
  if (!post) {
    res.status(404);
    return res.json({
      success: false,
      message: "Post not found.",
    });
  }

  // 只有自己才能刪除
  // 不能用 == 只能用equals()，因為在reference data type中，==是用來判斷兩個比較物件是不是有相同的 references
  // equals()可以判斷兩個有不同references的物件是否指向相同的值。
  if (post.author.equals(req.user._id)) {
    try {
      await Comment.deleteMany({ postSource: _id });
    } catch (e) {
      return res.send(e);
    }

    Post.deleteOne({ _id })
      .then(() => {
        res.send("Deleted success");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    // 403 => 服務器成功解析請求但是客戶端沒有訪問該資源的權限
    res.status(403);
    return res.json({
      seccess: false,
      message: "Only author can edit the post.",
    });
  }
});

/* ----------------------commentRoute----------------------- */

// 新增留言(_post_id)
router.post("/comment/:_post_id", async (req, res) => {
  // 驗證留言格式是否正確
  const { error } = commentValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // 新增留言到貼文
  try {
    // 找尋貼文
    const { _post_id } = req.params;
    console.log(_post_id);
    let post = await Post.findOne({ _id: _post_id });
    console.log(post);
    if (!post) {
      res.status(404);
      return res.json({
        success: false,
        message: "Post not found.",
      });
    }
    // 新增留言
    const { dangerous, content } = req.body;
    const newComment = new Comment({
      dangerous,
      content,
      author: req.user._id,
      postSource: post._id,
    });

    // 儲存留言
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();
    const plusdata = await Comment.findOne({ _id: newComment._id }).populate(
      "author",
      "username"
    );

    res.send(plusdata);
  } catch (e) {
    res.send(e);
  }
});

//編輯留言(_comment_id)
router.patch("/comment/:_id", async (req, res) => {
  // 驗證留言格式是否正確
  const { error } = commentValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // 找到留言
  const { _id } = req.params;
  const comment = await Comment.findOne({ _id });
  if (!comment) {
    res.status(404);
    return res.json({
      success: false,
      message: "Comment not found.",
    });
  }

  // 只有本人才能編輯留言
  if (comment.author.equals(req.user._id)) {
    const { dangerous, content } = req.body;
    Comment.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("author", ["username"])
      .then((updateComment) => {
        res.send(updateComment);
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    // 403 => 服務器成功解析請求但是客戶端沒有訪問該資源的權限
    res.status(403);
    return res.json({
      seccess: false,
      message: "Only oneself can edit the comment.",
    });
  }
});

// 刪除留言(_comment_id)
router.delete("/comment/:_id", async (req, res) => {
  // 找尋貼文
  const { _id } = req.params;
  let comment = await Comment.findOne({ _id });
  if (!comment) {
    res.status(404);
    return res.json({
      success: false,
      message: "Comment not found.",
    });
  }

  // 只有自己才能刪除
  // 不能用 == 只能用equals()，因為在reference data type中，==是用來判斷兩個比較物件是不是有相同的 references
  // equals()可以判斷兩個有不同references的物件是否指向相同的值。
  if (comment.author.equals(req.user._id)) {
    // 找到貼文來源
    try {
      let post = await Post.findOne({ _id: comment.postSource });
      let updatedPostComment = post.comments.filter(
        (data) => !data.equals(_id)
      );
      post.comments = updatedPostComment;
      await post.save();
    } catch (e) {
      return res.send(e);
    }

    Comment.deleteOne({ _id })
      .then(() => {
        res.send("Deleted success");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    // 403 => 服務器成功解析請求但是客戶端沒有訪問該資源的權限
    res.status(403);
    return res.json({
      seccess: false,
      message: "Only author can edit the post.",
    });
  }
});

module.exports = router;
