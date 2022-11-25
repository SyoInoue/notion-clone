const router = require("express").Router(); //ルーティングの設定
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

//ログインしているユーザーが投稿したメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

//ログインしているユーザーが投稿したメモを一つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

//ログインしているユーザーが投稿したメモを一つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

//ログインしているユーザーのメモを削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;
