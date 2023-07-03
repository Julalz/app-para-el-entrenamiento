import React, { useEffect, useState } from "react";
import {
  GetExercisebyMuscle,
  getProfile,
} from "../../services/ejerciciosService";
import "./exerciseByMuscle.css";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/shared/button/Button";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";

function ExerciseByMuscle() {
  const { muscle } = useParams();
  const [error, setError] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [data, setData] = useState(null);

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token) {
          const responseProfile = await getProfile(token);
          setData(responseProfile.data);
        }
      } catch (error) {
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await GetExercisebyMuscle(muscle, token);
        setEjercicios(response.data);
        console.log("Filtrando");
        console.log(response);
      } catch (error) {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      }
    };

    loadExercises();
  }, [muscle]);
  return (
    <section className="all-muscle-exercise-container">
      <div className="title-muscle">
        <h3>¡Ha llegado el momento Xtreme!</h3>
      </div>
      <div className="exercise-container">
        {ejercicios.map((ejercicio) => (
          <li className="exercise-li" key={ejercicio?.id}>
            <img
              className="exercise-image"
              src={ejercicio?.imageUrl}
              alt={ejercicio?.name}
            />
            <h6>{ejercicio?.name}</h6>
            <p>{ejercicio?.description}</p>
            <p>{ejercicio?.typology}</p>

            <div>
              {data?.data === "admin" && (
                <Link to="/updateExercise">
                  <Button
                    className="button-update-exercise"
                    text={"Actualizar"}
                  />
                </Link>
              )}
            </div>
          </li>
        ))}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
}

export default ExerciseByMuscle;
