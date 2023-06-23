import Button from "../../components/shared/button/Button";
import { Link } from "react-router-dom";
import "./joinNow.css";

const JoinNow = () => {
  return (
    <section className="join-section">
      <div className="gif-div">
        <img
          className="join-gif"
          src="../../../public/images/joinNow.gif"
          alt="gym gif"
        ></img>
      </div>
      <div className="text-and-buttons">
        <p>Únete a FitXtreme hoy</p>
        <h1>
          <br /> Donde hacer ejercicio <br /> siempre debería ser <br /> tan
          divertido como salir
        </h1>
        <Link to="/login">
          <Button text="Login" />
        </Link>
        <Link to="/register">
          <Button text="Registro" />
        </Link>
      </div>
    </section>
  );
};
export default JoinNow;
