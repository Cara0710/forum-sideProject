const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// mongoose schema middleware
// 如果密碼是新的或變更過，在存之前將密碼加密
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  }
});

// 登入時，將密碼解密確認
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    } else {
      cb(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
