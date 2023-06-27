import Button from "../../components/shared/button/Button";
import { useForm } from "react-hook-form";
import "./createExercise.css";

function CreateExercise() {
  const { register } = useForm();
  return (
    <div className="backgroundCreateExercise-container">
      <div className="createExercise-container">
        <img
          src="../../../public/images/Arranque desde Bloques.png"
          className="imgCreate"
          alt="Imagen"
        />
        <form className="FormCreateExercise">
          <h2>Crear Ejercicio</h2>
          <label>Nombre</label>
          <input type="text" {...register("name")} />
          <label>Descripción</label>
          <input type="text" {...register("description")} />
          <label>Imagen</label>
          <input type="file" {...register("imagen")} />
          <label>Tipología</label>
          <input type="text" {...register("typologia")} />
          <label>Músculo</label>
          <input type="text" {...register("musculo")} />
          <Button className="buttonCreate" text="Crear"></Button>
        </form>
      </div>
    </div>
  );
}
export default CreateExercise;
