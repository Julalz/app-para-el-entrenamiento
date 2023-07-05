import React, { useEffect, useState } from "react";
import {
  GetExercisebyMuscle,
  getProfile,
} from "../../services/ejerciciosService";
import "./exerciseByMuscle.css";
import { Link, useParams } from "react-router-dom";
import iconoActualizar from "../../../public/images/iconos/icono-actualizar.png";
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
      <div>
        <p className="title-muscle">Ha llegado el momento Xtreme</p>
      </div>
      <div className="exercise-container">
        {ejercicios.map((ejercicio) => (
          <li className="exercise-li" key={ejercicio?.id}>
            {console.log("Ejersisio::", ejercicio)}
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
                <Link to={`/updateExercise/${ejercicio?.id}`}>
                  <img
                    src={iconoActualizar}
                    alt="Actualizar ejercicio"
                    style={{ width: "50px", height: "50px" }}
                    className="icono-actualizar"
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
