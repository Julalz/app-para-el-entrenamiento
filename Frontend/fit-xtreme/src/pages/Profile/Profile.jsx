import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";
import {
  getProfile,
  getFavoriteExercise,
  deletFavoriteExercise,
} from "../../services/ejerciciosService";
import Button from "../../components/shared/button/Button";
import CardCarrusel from "../../components/shared/Carrusel/Carrusel";
import AvatarDefault from "../../../public/images/locationGym/3834568.png";
import "./profile.css";
import axios from "axios";

function Profile() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState();

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  console.log(token);

  const handleDeleteFavorite = async (id) => {
    try {
      if (token) {
        const response = await deletFavoriteExercise(id, token);
        setCarouselImages((prevImages) =>
          prevImages.filter((exercise) => exercise.id !== id)
        );
        console.log(response);
      }
    } catch (error) {
      setError("Error deleting favorite exercise");
    }
  };

  const inputRef = useRef(null);

  const handleAvatarClick = () => {
    inputRef.current.click();
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
    const fetchFavorites = async () => {
      try {
        if (token) {
          const response = await getFavoriteExercise(token);
          console.log("Respuesta:", response.data);
          setCarouselImages(response.data);
          console.log(response);
        }
      } catch (error) {
        setError("Error fetching favorite exercises");
      }
    };

    if (token) fetchFavorites();
  }, [token]);

  useEffect(() => {
    const updateAvatar = async () => {
      setError("");

      try {
        const formData = new FormData();
        formData.append("image", avatar);

        await axios.put(
          "http://localhost:3000/api/v1/users/profile",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        setError(error.message);
        setAvatar(null);
      }
    };
    if (avatar) updateAvatar();
  }, [avatar]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setAvatar(file);
  };

  console.log(data);

  const userAvatar = avatar
    ? URL.createObjectURL(avatar)
    : data?.image
    ? `http://localhost:3000/images/${data.image}`
    : AvatarDefault;

  if (!data) return <p>Loading</p>;

  return (
    <div className="profile-container">
      <div className="AllInfoProfile-container">
        <section className="avatar-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            style={{ display: "none" }}
          />
          <img
            className="avatar"
            src={userAvatar}
            alt="imagen de avatar"
            onClick={handleAvatarClick}
          />
          <h1>¡Hola! Bienvenido {data?.name}</h1>

          {data?.data === "admin" && (
            <div className="ifAdminButton">
              <p>Eres administrador</p>
              <div>
                <Link to="/createExercise">
                  <Button
                    className="ButtonCrearEjercicio"
                    text={"Crear Ejercicio"}
                  />
                </Link>
                <Link to="/Ejercicios">
                  <Button text="Actualizar ejercicios" />
                </Link>
                <Link to="/Configuracion">
                  <Button text="Configuración" />
                </Link>
              </div>
            </div>
          )}

          {data?.data === "reader" && (
            <div className="ifReaderButton">
              <div>
                <Link to="/Ejercicios">
                  <Button
                    className="ButtonSeleccionarEjercicio"
                    text={"Seleccionar tus ejercicios"}
                  />
                </Link>
                <Link to="/Configuracion">
                  <Button text="Configuración" />
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="FavoriteExercise-container">
          <p> ¿Quieres repetir un ejercicio y darle caña?</p>
          <p>TU LISTA DE FAVORITOS</p>

          <div className="carrousel-container">
            {carouselImages.map((exercise, index) => (
              <CardCarrusel
                key={index}
                exercise={exercise}
                onDeleteFavorite={handleDeleteFavorite}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
