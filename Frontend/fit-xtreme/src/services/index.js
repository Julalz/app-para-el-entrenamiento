import axios from "axios";

const isBearerTokenRequired = (url) => {
  const publicRoutes = ["/login", "account"];
  return publicRoutes.includes(url);
};

axios.interceptors.request.use(
  function (config) {
    if (!isBearerTokenRequired(config.url)) {
      console.log(config.url);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(message);
  }
);

export { singup };
