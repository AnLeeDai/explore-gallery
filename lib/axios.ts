import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY,
  },
});

instance.interceptors.response.use(
  (response) => response,

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
