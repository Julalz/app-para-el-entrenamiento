import { Link } from "react-router-dom";
import "./nameXtreme.css";

function NameXtreme() {
  return (
    <h1 className="h1">
      <Link to={"/"}>
        Fit<span className="x-text">X</span>treme
      </Link>
    </h1>
  );
}
export default NameXtreme;
