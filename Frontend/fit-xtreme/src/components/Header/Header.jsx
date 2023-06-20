import { Link } from "react-router-dom";
import "./header.css";
import NavigationMenu from "../NavigationMenu";

function Header() {
  return (
    <header>
      <h1>
        <Link to={"/"}>
          Fit<span className="x-text">X</span>treme
        </Link>
      </h1>

      <nav>
        <NavigationMenu />
      </nav>
    </header>
  );
}

export default Header;
