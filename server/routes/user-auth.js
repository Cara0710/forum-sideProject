const router = require("express").Router();
const User = require("../models").userModel;
const registerValidation = require("../validation").registerValidation;

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to userAuth API.");
  next();
});

// 編輯個人資訊(_user_id)
router.patch("/:_id", async (req, res) => {
  // 確認編輯檔案格式是否正確
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // 找尋用戶
  const { _id } = req.params;
  let user = await User.findOne({ _id });
  if (!user) {
    res.status(404);
    return res.json({
      success: false,
      message: "User not found.",
    });
  }

  // 只有自己才能編輯
  if (_id == req.user._id) {
    User.findById({ _id }, async (err, user) => {
      if (err) {
        return res.send({ seccess: false, message: err });
      }
      Object.assign(user, req.body);
      try {
        const savedUpdatedUser = await user.save();
        res.status(200).send(savedUpdatedUser);
      } catch (err) {
        res.status(400).send("User not saved");
      }
    });
  } else {
    // 403 => 服務器成功解析請求但是客戶端沒有訪問該資源的權限
    res.status(403);
    return res.json({
      seccess: false,
      message: "only User ownself can edit.",
    });
  }
});

// 刪除用戶帳號(_user_id)
router.delete("/:_id", async (req, res) => {
  // 找尋用戶
  const { _id } = req.params;
  let user = await User.findOne({ _id });
  if (!user) {
    res.status(404);
    return res.json({
      success: false,
      message: "User not found.",
    });
  }

  // 只有自己才能刪除
  if (_id == req.user._id) {
    User.deleteOne({ _id })
      .then(() => {
        res.send("User deleted.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    // 不是本人沒有權限
    // 403 => 服務器成功解析請求但是客戶端沒有訪問該資源的權限
    res.status(403);
    return res.json({
      seccess: false,
      message: "only User ownself can delete.",
    });
  }
});

module.exports = router;
