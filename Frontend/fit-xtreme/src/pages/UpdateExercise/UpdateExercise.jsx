import { useParams } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/shared/button/Button";
import { updateEjercicios } from "../../services/ejerciciosService";
import imageDefault from "../../../public/images/locationGym/recuerdaImagen.png";
import "./updateExercise.css";

function UpdateExercise() {
  const { exerciseId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscle, setMuscle] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(imageDefault);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      if (name.trim() !== "") {
        formData.append("name", name);
      }
      if (description.trim() !== "") {
        formData.append("description", description);
      }
      if (typology.trim() !== "") {
        formData.append("typology", typology);
      }
      if (muscle.trim() !== "") {
        formData.append("muscle", muscle);
      }

      if (image) {
        formData.append("image", image);
      }

      const updateExercise = await updateEjercicios(exerciseId, formData);
      console.log("Ejercicio actualizado:", updateExercise);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="backgroundUpdateExercise-container">
      <div className="updateExercise-container">
        <img src={previewImage} className="imgUpdate" alt="Imagen" />
        <form className="FormUpdateExercise" onSubmit={handleSubmit}>
          <h2>Actualizar Ejercicio</h2>

          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Tipología</label>
          <input
            type="text"
            value={typology}
            onChange={(e) => setTypology(e.target.value)}
          />

          <label>Músculo</label>
          <input
            type="text"
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
          />

          <label>Imagen</label>
          <input type="file" onChange={handleImageChange} />

          <div className="buttonCreate">
            <Button text="Actualizar" />
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateExercise;
