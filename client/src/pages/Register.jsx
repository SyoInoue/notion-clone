import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  //sumit後にTopPageへの自動遷移
  const navigate = useNavigate();
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    //submit後にレンダリングされないための記述
    e.preventDefault();

    //submit時に全て空にしておきたいので...
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    //入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    //エラーかどうか判定するための変数
    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmErrText("確認用パスワードを入力してください");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText("パスワードと確認用パスワードが異なります");
    }

    if (error) return;

    setLoading(true);

    //新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました");
      navigate("/");
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
        if (err.param === "password") {
          setConfirmErrText(err.msg);
        }
      });
      setLoading(true);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          fullWidth
          helperText={usernameErrText}
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          error={usernameErrText !== ""}
        />
        <TextField
          required
          fullWidth
          helperText={passwordErrText}
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          error={passwordErrText !== ""}
        />
        <TextField
          required
          fullWidth
          helperText={confirmErrText}
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          error={confirmErrText !== ""}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          color="primary"
          variant="outlined"
          loading={loading}
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/Login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
