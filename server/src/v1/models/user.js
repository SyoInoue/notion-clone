const mongoose = require("mongoose"); //マングース。Mongodb用のスキーマライブラリ

const userSchema = new mongoose.Schema({
  //ユーザースキーマの定義
  username: {
    type: String,
    required: true, //必須項目
    unique: true, //重複NG
  },
  password: {
    type: String,
    required: true, //必須項目
  },
});

//エクスポートでどこでも使えるようにする。
module.exports = mongoose.model("User", userSchema);
