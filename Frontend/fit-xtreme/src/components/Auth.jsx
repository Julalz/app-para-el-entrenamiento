import { Link } from "react-router-dom";

function Auth() {
  return (
    <ul>
      <li>Home</li>
      <li>Ejercicios</li>
      <li>
        <Link to={"/register"}>Register</Link>
      </li>
      <li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </li>
    </ul>
  );
}

export default Auth;
