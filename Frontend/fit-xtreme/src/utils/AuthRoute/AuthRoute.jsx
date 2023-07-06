import { LOCAL_STORAGE_USER } from "../constanst";
import { Navigate, useNavigate } from "react-router-dom";

function AuthRoute({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  if (!token) {
    return <Navigate to={"/join"} />;
  }

  return children;
}

export default AuthRoute;
