import { Link } from "react-router-dom";
import Menuhamburguesa from "./Header/Menuhamburguesa/Menuhamburguesa";
import { LOCAL_STORAGE_USER } from "../utils/constanst";

function NavigationMenu({ isLogged }) {
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/EjerciciosHome"}>¿Porque somos Xtreme?</Link>
      </li>
      <li>
        {isLogged ? (
          <Link to={"/Ejercicios"}>Ejercicios</Link>
        ) : (
          <Link to={"/join"}>Registrate</Link>
        )}
      </li>
      <li>
        <Menuhamburguesa />
      </li>
    </ul>
  );
}

export default NavigationMenu;
