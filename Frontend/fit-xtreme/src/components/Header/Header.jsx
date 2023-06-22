import NavigationMenu from "../NavigationMenu";
import NameXtreme from "./NameXtreme/NameXtreme";
import "./header.css";

function Header() {
  return (
    <header>
      <h1>
        <NameXtreme />
      </h1>

      <nav>
        <NavigationMenu />
      </nav>
    </header>
  );
}

export default Header;
