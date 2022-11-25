import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import memoApi from "../api/memoApi";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      console.log(res);
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      //finallyはtryでもcatchでも必ず実行される。
      setLoading(false);
    }
  };
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingButton
          variant="outlined"
          onClick={() => createMemo()}
          loading={loading}
        >
          最初のメモを作成
        </LoadingButton>
      </Box>
    </div>
  );
};
