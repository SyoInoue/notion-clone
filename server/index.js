const express = require("express"); //importの記述。Expressの読み込み
const mongoose = require("mongoose"); //Mongodb用のschemaLibrary
const app = express(); //インスタンス化
const PORT = 5000; //ローカルサーバーのポート番号
const cors = require("cors"); //corsエラー解消Library
require("dotenv").config(); //envファイルLibrary

//React側のポート番号3000番を許可する。
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); //jsonObjectを認識できるようになる。
app.use("/api/v1", require("./src/v1/routes")); //エンドポイントの指定

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中・・・");
} catch (error) {
  console.log(error);
}

//ローカルサーバーの記述
app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・");
});
