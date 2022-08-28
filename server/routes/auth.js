const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

// middleware
router.use((rea, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

// test API
router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is wordking",
  };
  return res.json(msgObj);
});

// 1. 註冊用戶路徑
router.post("/register", async (req, res) => {
  // 確認輸入註冊格式是否正確
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //   確認使用者是否存在
  const { username, password } = req.body;
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    return res.status(400).send("使用者名稱已經存在");
  }

  //   註冊新用戶
  const newUser = new User({ username, password });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    res.status(400).send("User not saved");
  }
});

// 2.登入路徑
router.post("/login", (req, res) => {
  // 確認登入格式是否正確
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //   確認是否有註冊
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(401).send("此帳號並不存在");
      } else {
        // 有註冊過，驗證帳密
        user.comparePassword(password, function (err, isMatch) {
          if (err) {
            return res.status(400).send(err);
          }
          //   驗證成功，產生token
          if (isMatch) {
            // payload不能放重要資訊
            const tokenObject = { _id: user._id, username: user.username };
            const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
            res.send({ success: true, token: "JWT " + token, user });
          } else {
            res.status(401).send("您輸入的密碼錯誤");
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
