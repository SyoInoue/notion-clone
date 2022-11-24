const JWT = require("jsonwebtoken"); //JWT発行Library
const CryptoJS = require("crypto-js"); //パスワード暗号化Library
const User = require("../models/user"); //UserModelをimport

exports.register = async (req, res) => {
  //パスワードの受け取り
  const password = req.body.password;
  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成
    const user = await User.create(req.body);
    //JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

//ユーザーログイン用API
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //DBからユーザーが存在するか探してくる
    const user = await User.findOne({ username: username });
    if (!user) {
      //認証する資格がない。
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "ユーザーが名が無効です",
          },
        ],
      });
    }
    //パスワードが合っているか照合する。
    const deCryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    //パスワード適合チェック
    if (deCryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    //JWTトークンを発行(24時間まで有効)
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });

    //リクエスト成功、新たなリソースの作成に成功したことを表す。
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
