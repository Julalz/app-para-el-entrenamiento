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

function Profile() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(AvatarDefault);

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.data.token;

  const handleFormAvatar = async (data) => {
    setError("");
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await formData;
    } catch (error) {}

    // Aquí puedes timplementar la lógica para enviar la imagen al servidor
    // utilizando formData, por ejemplo: axios.post('/upload', formData)
  };

  const handleDeleteFavorite = async (id) => {
    try {
      if (token) {
        const response = await deletFavoriteExercise(id);
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
          console.log(response);
        }
      } catch (error) {
        setError("Error fetching favorite exercises");
      }
    };

    fetchFavorites();
  }, [token]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Aquí puedes implementar la lógica para actualizar la imagen de avatar
    setAvatar(URL.createObjectURL(file));
  };

  return (
    <>
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
              src={avatar}
              alt="imagen de avatar"
              onClick={handleAvatarClick}
            />
            <h1>Hey! Bienvenido {data?.name}</h1>
            {data?.data === "admin" && (
              <div className="ifAdminButton">
                <p>Eres Admin</p>
                <div>
                  <Link to="/CreateExercise">
                    <Button
                      className="ButtonCreateEjercicio"
                      text={"Crear Ejercicio"}
                    />
                  </Link>
                  <Link to="/Ejercicios">
                    <Button text="Actualizar ejercicios" />
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
    </>
  );
}

export default Profile;
