import { LOCAL_STORAGE_USER } from "../constanst";

function AuthRoute({ children }) {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default AuthRoute;
