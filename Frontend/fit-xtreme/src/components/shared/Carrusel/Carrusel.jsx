import iconoDelete from "../../../../public/images/locationGym/3834568.png";

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
      <button onClick={handleDeleteFavorite}></button>
    </li>
  );
}

export default CardCarrusel;
