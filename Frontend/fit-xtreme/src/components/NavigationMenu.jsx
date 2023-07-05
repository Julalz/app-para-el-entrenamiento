import { Link } from "react-router-dom";
import Menuhamburguesa from "./Header/Menuhamburguesa/Menuhamburguesa";
import { LOCAL_STORAGE_USER } from "../utils/constanst";
import Header from "./Header/Header";

const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
const token = user?.token;

console.log(token);
function NavigationMenu() {
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/EjerciciosHome"}>¿Porque somos Xtreme?</Link>
      </li>
      <li>
        {token ? (
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
