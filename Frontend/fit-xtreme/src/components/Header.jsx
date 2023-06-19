import Auth from "./Auth";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <h1>
        <Link to={"/"}>
          Fit<span className="x-text">X</span>treme
        </Link>
      </h1>

      <nav>
        <Auth />
      </nav>
    </header>
  );
}

export default Header;