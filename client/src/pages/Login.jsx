import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Login = () => {
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
    console.log(username);
    console.log(password);

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

    if (error) return;

    setLoading(true);

    //新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");
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
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          color="primary"
          variant="outlined"
          loading={loading}
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
