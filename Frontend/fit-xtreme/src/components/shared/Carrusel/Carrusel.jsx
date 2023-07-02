import iconoDelete from "../../../../public/images/iconos/icons8-basura-64.png";
import "./carrusel.css";

function CardCarrusel({ exercise, onDeleteFavorite }) {
  const handleDeleteFavorite = () => {
    onDeleteFavorite(exercise.id);
  };
  return (
    <li className="exercise-card">
      <img
        className="exercise-image"
        src={exercise?.imageUrl}
        alt="Imagen del ejercicio"
      />
      <h6>{exercise?.name}</h6>
      <p>{exercise?.description}</p>
      <p>{exercise?.typology}</p>
      <button
        className="button-container"
        onClick={handleDeleteFavorite}
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <img
          src={iconoDelete}
          alt="Icono Eliminar"
          style={{ width: "50px", height: "50px" }}
        />
      </button>
    </li>
  );
}

export default CardCarrusel;
