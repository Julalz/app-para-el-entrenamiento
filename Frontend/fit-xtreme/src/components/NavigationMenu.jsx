import { Link } from "react-router-dom";

function NavigationMenu() {
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/Ejercicios"}>Ejercicios</Link>
      </li>
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

export default NavigationMenu;
