function CardCarrusel({ exercise }) {
  return (
    <li className="exercise-card">
      <img src={exercise?.image} alt={exercise?.name} />
      <h6>{exercise?.name}</h6>
      <p>{exercise?.description}</p>
      <p>{exercise?.typology}</p>
    </li>
  );
}

export default CardCarrusel;
