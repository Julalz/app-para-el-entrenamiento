import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import humo from "../../../public/videos/humo.mp4";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";
import {
  getProfile,
  getFavoriteExercise,
} from "../../services/ejerciciosService";
import Button from "../../components/shared/button/Button";
import "./profile.css";
import CardCarrusel from "../../components/shared/Carrusel/Carrusel";

function Profile() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.data.token;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token) {
          const responseProfile = await getProfile();
          setData(responseProfile.data);
        }
      } catch (error) {
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (token) {
          const response = await getFavoriteExercise();
          setCarouselImages(response.data);
        }
      } catch (error) {
        setError("Error fetching favorite exercises");
      }
    };

    fetchFavorites();
  }, [token]);

  return (
    <>
      <div className="principal-profile-container">
        <video src={humo} autoPlay loop muted />
        <section className="avatar">
          <img
            src="../../../public/images/iconos/pesa.png"
            alt="imagen de avatar"
            className="my-photo"
          />
          <h1 className="name">Hey! Bienvenido {data?.name}</h1>
          {data?.data === "admin" && (
            <div>
              <p>Eres Admin</p>
              <div>
                <Link to="/CreateExercise">
                  <Button
                    className="ButtonCreateEjercicio"
                    text={"Crear Ejercicio"}
                  />
                </Link>
              </div>
            </div>
          )}
        </section>
        <section className="description">
          <p className="frase-777">
            Aquí encontrarás todos los ejercicios que te han interesado.
          </p>
          <p className="porTodas">¡A POR TODAS!</p>

          <div className="carrousel-container">
            {carouselImages.map((exercise, index) => (
              <CardCarrusel key={index} exercise={exercise} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
