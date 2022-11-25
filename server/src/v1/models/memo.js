const mongoose = require("mongoose"); //マングース。Mongodb用のスキーマライブラリ
const Schema = mongoose.Schema;

const memoSchema = new Schema({
  //メモスキーマの定義
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  description: {
    type: String,
    default: "ここに自由に記入してください。",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

//エクスポートでどこでも使えるようにする。
module.exports = mongoose.model("Memo", memoSchema);
