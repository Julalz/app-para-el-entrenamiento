import axios from "axios";

export function login(email, password) {
  console.log("llamando a login");
  return axios.post("http://localhost:3000/api/v1/users/login", {
    email,
    password,
  });
}

export function signup(name, email, password) {
  return axios.post("http://localhost:3000/api/v1/users/signup", {
    name,
    email,
    password,
  });
}
