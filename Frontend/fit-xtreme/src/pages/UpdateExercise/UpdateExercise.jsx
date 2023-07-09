import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/shared/button/Button";
import { updateEjercicios } from "../../services/ejerciciosService";
import imageDefault from "../../../public/images/locationGym/recuerdaImagen.png";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";
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
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-type": "multipart/form-data",
      },
    };

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

      const updateExercise = await updateEjercicios(
        exerciseId,
        formData,
        config,
        token
      );

      setMessage(updateExercise.message);

      setTimeout(() => {
        navigate("/Ejercicios");
      }, 2000);
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

          <label>Imagen</label>
          <input type="file" onChange={handleImageChange} />

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

          <div className="buttonCreate">
            <Button text="Actualizar" />
            {message && !error && <p>{message}</p>}
            {error && <p className="updated-error">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateExercise;
