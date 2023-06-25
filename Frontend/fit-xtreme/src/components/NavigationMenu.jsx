import { Link } from "react-router-dom";
import Menuhamburguesa from "./Header/Menuhamburguesa/Menuhamburguesa";

function NavigationMenu() {
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/Ejercicios"}>¿Porque somos Xtreme?</Link>
      </li>
      <li>
        <Link to={"/join"}>Registrate</Link>
      </li>
      <li>
        <Menuhamburguesa />
      </li>
    </ul>
  );
}

export default NavigationMenu;
