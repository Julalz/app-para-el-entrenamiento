import React, { useEffect, useState } from "react";
import { GetExercisebyMuscle } from "../../services/ejerciciosService";
import "./exerciseByMuscle.css";

function ExerciseByMuscle() {
  const [error, setError] = useState("");
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await GetExercisebyMuscle();
        setEjercicios(response.data);
      } catch (error) {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      }
    };

    loadExercises();
  }, []);

  return (
    <div className="div-container-ByMuscle">
      <ul>
        {ejercicios.map((ejercicio) => (
          <li key={ejercicio.name}>{ejercicio.name}</li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
}

export default ExerciseByMuscle;
