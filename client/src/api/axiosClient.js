import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
const getToken = () => localStorage.getItem("token");

//独自のaxiosインスタンスを作成
const axiosClient = axios.create({
  baseURL: BASE_URL,
});

//APIを叩く前に行う処理を記述。
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      //リクエストヘッダにJWTを付けてサーバーに渡す。
      authorization: `Bearer ${getToken()}`,
    },
  };
});

//帰ってきたレスポンスを受け取る前に行う処理を記述。
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
