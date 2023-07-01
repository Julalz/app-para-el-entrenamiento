export function getProfile() {
  return axios.get("http://localhost:3000/api/v1/users/profile");
}
