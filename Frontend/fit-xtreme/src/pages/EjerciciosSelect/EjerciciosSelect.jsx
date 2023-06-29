import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/button/Button";
import EjerciciosLis from "./../../../public/videos/EjerciciosLis.mp4";
import { GetExercisebyMuscle } from "../../services/ejerciciosService";
import "./ejerciciosselect.css";
function EjerciciosSelect() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await GetExercisebyMuscle(muscle);
        setEjercicios(response.data);
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
    <div className="EjerciciosBackground-container">
      <video src={EjerciciosLis} autoPlay loop muted></video>
      <div className="ul-container-ejercicios">
        <h2>¡Hola, Xtremer! Selecciona qué músculos quieres trabajar</h2>
        <ul className="lis-container-ejercicio">
          <li>
            <Link to="/ejercicios/pectorales">
              <Button
                text="Pectorales"
                onClick={() => handleClick("pectorales")}
              />
            </Link>
          </li>
          <li>
            <Link to="/ejercicios/lumbar">
              <Button text="Lumbar" onClick={() => handleClick("lumbar")} />
            </Link>
          </li>
          <li>
            <Link to="/ejercicios/biceps">
              <Button text="Bíceps" onClick={() => handleClick("biceps")} />
            </Link>
          </li>
          <li>
            <Link to="/ejercicios/triceps">
              <Button text="Tríceps" onClick={() => handleClick("triceps")} />
            </Link>
          </li>
          <li>
            <Link to="/ejercicios/abdominales">
              <Button
                text="Abdominales"
                onClick={() => handleClick("abdominales")}
              />
            </Link>
          </li>
        </ul>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default EjerciciosSelect;
