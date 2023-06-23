import { Link } from "react-router-dom";
import Menuhamburguesa from "./Header/Menuhamburguesa/Menuhamburguesa";

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
        <Link to={"/join"}>Acceso</Link>
      </li>
      <li>
        <Menuhamburguesa />
      </li>
    </ul>
  );
}

export default NavigationMenu;
