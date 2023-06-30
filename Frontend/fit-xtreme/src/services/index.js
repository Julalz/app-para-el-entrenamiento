import axios from "axios";
import { LOCAL_STORAGE_USER } from "../utils/constanst";
import { login, signup } from "./authService";

const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
const token = currentUser?.token;

const isBearerTokenRequired = (url) => {
  const parseUrl = new URL(url);
  const publicRoutes = ["api/v1/users/login", "api/v1/users/register"];
  if (publicRoutes.includes(parseUrl.pathname + parseUrl.search)) {
    return false;
  } else {
    return true;
  }
};

axios.interceptors.request.use(
  function (config) {
    if (token && isBearerTokenRequired(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    if (response?.data?.token) {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response));
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_USER);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { login, signup };
