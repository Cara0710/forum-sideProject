const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const postRoute = require("./routes").post;
const authRoute = require("./routes").auth;
const postAuthRoute = require("./routes").postAuth;
const userAuthRoute = require("./routes").userAuth;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// 連接到mongodb altas
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("connect to mongodb.");
  })
  .catch((e) => {
    console.log(e);
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/posts", postRoute);
app.use("/api/user", authRoute);
app.use(
  "/api/auth/posts",
  passport.authenticate("jwt", { session: false }),
  postAuthRoute
);

app.use(
  "/api/auth/user",
  passport.authenticate("jwt", { session: false }),
  userAuthRoute
);

app.get("/*", (req, res) => {
  res.status(404);
  res.send("Not allow");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something is broken.we will fix it soon.");
});
// 連接伺服器
app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
