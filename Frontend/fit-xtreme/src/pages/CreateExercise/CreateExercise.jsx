import Button from "../../components/shared/button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import imageDefault from "../../../public/images/locationGym/recuerdaImagen.png";
import { createEjercicios } from "../../services/ejerciciosService";
import "./createExercise.css";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";

function CreateExercise() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(imageDefault);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscle, setMuscle] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  const onChangeName = (e) => setName(e.target.value);
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeTypolgy = (e) => setTypology(e.target.value);
  const onChangeMuscle = (e) => setMuscle(e.target.value);
  const onChangeImagen = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };
  const handleForm = async (data) => {
    setError("");
    const formData = new FormData();
    formData.append("image", data.image[0]);

    formData.append("name", name);
    formData.append("typology", typology);
    formData.append("muscle", muscle);
    formData.append("description", description);

    const config = {
      header: {
        "Content-type": "multipart/form-data",
      },
    };

    try {
      const response = await createEjercicios(formData, config, token);

      setError(response.data.data.message);
    } catch (error) {
      console.log(error);
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
        <img src={image} className="imgCreate" alt="Imagen" />
        <form
          className="FormCreateExercise"
          onSubmit={handleSubmit(handleForm)}
        >
          <h2>Crear Ejercicio, crea salud</h2>

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
          <input type="file" {...register("image")} onChange={onChangeImagen} />
          <label>Tipología</label>
          <input
            type="text"
            {...register("typology")}
            value={typology}
            onChange={onChangeTypolgy}
          />
          <label>Músculo</label>
          <input
            type="text"
            {...register("muscle")}
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
