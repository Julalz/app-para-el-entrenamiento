import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/button/Button";
import EjerciciosLis from "./../../../public/videos/EjerciciosLis.mp4";

import "./ejerciciosselect.css";

function EjerciciosSelect() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [ejercicios, setEjercicios] = useState([]);

  const handleClick = (muscle) => {
    navigate(`/ejercicios/${muscle}`);
  };

  return (
    <section className="ejercicios-container">
      <video
        className="video-ejercicios"
        src={EjerciciosLis}
        autoPlay
        loop
        muted
      ></video>
      <h2 className="SelectMuscle">SELECCIONA QUE MÚSCULOS QUIERES TRABAJAR</h2>
      <div className="muscle-container">
        <ul>
          <Link
            to={`/ejercicios/pectorales`}
            className="link-muscle"
            onClick={() => handleClick("pectorales")}
          >
            <li>
              <Button text={"Pectorales"} />
            </li>
          </Link>
          <Link
            to="/ejercicios/lumbar"
            className="link-muscle"
            onClick={() => handleClick("lumbar")}
          >
            <li>
              <Button text={"Lumbares"} />
            </li>
          </Link>
          <Link
            to="/ejercicios/biceps"
            className="link-muscle"
            onClick={() => handleClick("biceps")}
          >
            <li>
              <Button text={"Biceps"} />
            </li>
          </Link>
          <Link
            to="/ejercicios/triceps"
            className="link-muscle"
            onClick={() => handleClick("triceps")}
          >
            <li>
              <Button text={"Triceps"} />
            </li>
          </Link>
          <Link
            to="/ejercicios/abdominales"
            className="link-muscle"
            onClick={() => handleClick("abdominales")}
          >
            <li>
              <Button text={"Abdominales"} />
            </li>
          </Link>
          <Link
            to="/ejercicios/cuadriceps"
            className="link-muscle"
            onClick={() => handleClick("cuadriceps")}
          >
            <li>
              <Button text={"Cuádriceps"} />
            </li>
          </Link>
          <Link
            to="/ejercicios/gemelos"
            className="link-muscle"
            onClick={() => handleClick("gemelos")}
          >
            <li>
              <Button text={"Gemelos"} />
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
}

export default EjerciciosSelect;
