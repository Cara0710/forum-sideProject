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
const port = process.env.PORT || 8080;

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

// post router
app.use("/api/posts", postRoute);

// user register login router
app.use("/api/user", authRoute);

// post need have auth router
app.use(
  "/api/auth/posts",
  passport.authenticate("jwt", { session: false }),
  postAuthRoute
);

// user need have auth router
app.use(
  "/api/auth/user",
  passport.authenticate("jwt", { session: false }),
  userAuthRoute
);

app.get("/*", (req, res) => {
  res.status(404);
  res.send("Not allow");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something is broken.we will fix it soon.");
});
// 連接伺服器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
