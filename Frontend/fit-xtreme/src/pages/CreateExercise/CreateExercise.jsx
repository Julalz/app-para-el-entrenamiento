import Button from "../../components/shared/button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./createExercise.css";
import { createEjercicios } from "../../services/ejerciciosService";

function CreateExercise() {
  const { register } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscle, setMuscle] = useState("");
  const [error, setError] = useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeTypolgy = (e) => setTypology(e.target.value);
  const onChangeMuscle = (e) => setMuscle(e.target.value);
  const onChangeImagen = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    console.log(e);
    try {
      const response = await createEjercicios(
        name,
        description,
        selectedImage,
        typology,
        muscle
      );

      setError(response.data.data.message);
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response.data.status === 409) {
        setError(error.response.data.error);
      } else {
        setError(error.response.data.error);
      }
    }
  };
  return (
    <div className="backgroundCreateExercise-container">
      <div className="createExercise-container">
        <img src={selectedImage} className="imgCreate" alt="Imagen" />
        <form className="FormCreateExercise" onSubmit={handleForm}>
          <h2>Crear Ejercicio</h2>

          <label>Nombre</label>
          <input
            type="text"
            {...register("name")}
            value={name}
            onChange={onChangeName}
          />

          <label>Descripción</label>
          <input
            type="text"
            {...register("description")}
            value={description}
            onChange={onChangeDescription}
          />
          <label>Imagen</label>
          <input
            type="file"
            {...register("imagen")}
            onChange={onChangeImagen}
          />
          <label>Tipología</label>
          <input
            type="text"
            {...register("typologia")}
            value={typology}
            onChange={onChangeTypolgy}
          />
          <label>Músculo</label>
          <input
            type="text"
            {...register("musculo")}
            value={muscle}
            onChange={onChangeMuscle}
          />
          <div className="buttonCreate">
            <Button text="Crear"></Button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateExercise;
