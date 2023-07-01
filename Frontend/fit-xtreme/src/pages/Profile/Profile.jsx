import React, { useState, useEffect } from "react";
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

  return (
    <>
      <div className="profile-container">
        <div className="AllInfoProfile-container">
          <section className="avatar-container">
            <img
              className="avatar"
              src={AvatarDefault}
              alt="imagen de avatar"
            />
            <h1>Hey! Bienvenido {data?.name}</h1>
            {data?.data === "admin" && (
              <div className="Lis-Container-Profile">
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
          <section className="FavoriteExercise-container">
            <p>Aquí encontrarás todos los ejercicios que te han interesado.</p>
            <p>¡A POR TODAS!</p>

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
