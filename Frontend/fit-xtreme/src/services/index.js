import axios from "axios";
import { LOCAL_STORAGE_USER } from "../utils/constanst";
import { login, signup } from "./authService";
import { createEjercicios } from "./ejerciciosService";
import { getProfile } from "./profile";

const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
const token = currentUser?.data.token;

console.log(currentUser);
const isBearerTokenRequired = (url) => {
  const parsedUrl = new URL(url);
  const publicRoutes = ["/login", "/register"];
  if (publicRoutes.includes(parsedUrl.pathname)) {
    return false;
  } else {
    return true;
  }
};

axios.interceptors.request.use(
  function (config) {
    if (token && isBearerTokenRequired(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log(config.headers);
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
      console.log(response);
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

export { login, signup, createEjercicios, getProfile };
