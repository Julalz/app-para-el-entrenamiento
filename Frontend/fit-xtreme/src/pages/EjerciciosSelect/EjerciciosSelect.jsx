import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/button/Button";
import EjerciciosLis from "./../../../public/videos/EjerciciosLis.mp4";
import { GetExercisebyMuscle } from "../../services/ejerciciosService";
import "./ejerciciosselect.css";
import ExerciseByMuscle from "../ExerciseByMuscle/ExerciseByMuscle";
function EjerciciosSelect() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        console.log("seteando");
        const response = await GetExercisebyMuscle(muscle);
        setEjercicios(response);
        console.log("response");
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    loadExercises();
  }, []);

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
      <h2>¡Hola, Xtremer! Selecciona qué músculos quieres trabajar</h2>
      <div className="muscle-container">
        <ul>
          <Link
            to={`/ejercicios/pectorales`}
            className="link-muscle"
            onClick={() => handleClick("pectorales")}
          >
            <li>Pectorales</li>
          </Link>
          <Link
            to="/ejercicios/lumbar"
            className="link-muscle"
            onClick={() => handleClick("lumbar")}
          >
            <li>Lumbar</li>
          </Link>
          <Link
            to="/ejercicios/biceps"
            className="link-muscle"
            onClick={() => handleClick("biceps")}
          >
            <li>Biceps</li>
          </Link>
          <Link
            to="/ejercicios/triceps"
            className="link-muscle"
            onClick={() => handleClick("triceps")}
          >
            <li>Triceps</li>
          </Link>
          <Link
            to="/ejercicios/abdominales"
            className="link-muscle"
            onClick={() => handleClick("abdominales")}
          >
            <li>Abdominales</li>
          </Link>
          <Link
            to="/ejercicios/cuadriceps"
            className="link-muscle"
            onClick={() => handleClick("cuadriceps")}
          >
            <li>Cuádriceps</li>
          </Link>
          <Link
            to="/ejercicios/gemelos"
            className="link-muscle"
            onClick={() => handleClick("gemelos")}
          >
            <li>Gemelos</li>
          </Link>
        </ul>
      </div>
    </section>
  );
}

export default EjerciciosSelect;
