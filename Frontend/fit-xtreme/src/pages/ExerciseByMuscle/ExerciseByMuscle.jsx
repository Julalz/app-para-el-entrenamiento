import React, { useEffect, useState } from "react";
import {
  GetExercisebyMuscle,
  deleteExercise,
  getProfile,
} from "../../services/ejerciciosService";
import "./exerciseByMuscle.css";
import { Link, useParams } from "react-router-dom";
import iconoActualizar from "../../../public/images/iconos/icono-actualizar.png";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";
import iconoEliminar from "../../../public/images/iconos/icono-eliminar.png";
import iconoFavoritos from "../../../public/images/iconos/favorite-icon.png";

function ExerciseByMuscle() {
  const { muscle } = useParams();
  const [error, setError] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [data, setData] = useState(null);

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  const handleDeleteExercise = async (id) => {
    const config = {
      header: {
        "Content-type": "multipart/form-data",
      },
    };
    try {
      if (token) {
        const response = await deleteExercise(id, config, token);
        const updatedEjercicios = ejercicios.filter(
          (ejercicio) => ejercicio.id !== id
        );
        setEjercicios(updatedEjercicios);
        console.log("Ejercicio eliminado:", response);
      }
    } catch (error) {
      setError("Error deleting exercise");
    }
  };

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

    if (token) fetchProfile();
  }, [token]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        console.log("testing");
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
            {console.log("Ejercicios:", ejercicio)}
            <img
              className="exercise-image"
              src={ejercicio?.imageUrl}
              alt={ejercicio?.name}
            />
            <h6>{ejercicio?.name}</h6>
            <p>{ejercicio?.description}</p>
            <p>Tipologia: {ejercicio?.typology}</p>
            <div className="card-buttons-container">
              <div className="update-icon">
                {data?.data === "admin" && (
                  <Link to={`/updateExercise/${ejercicio?.id}`}>
                    <img
                      src={iconoActualizar}
                      alt="Actualizar ejercicio"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                )}
              </div>
              <div className="favorite-icon">
                <Link>
                  <img
                    src={iconoFavoritos}
                    alt="Añadir a favoritos"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Link>
              </div>
              <div className="eliminar-icon">
                {data?.data === "admin" && (
                  <Link onClick={() => handleDeleteExercise(ejercicio?.id)}>
                    <img
                      src={iconoEliminar}
                      alt="Eliminar ejercicio"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
}

export default ExerciseByMuscle;
