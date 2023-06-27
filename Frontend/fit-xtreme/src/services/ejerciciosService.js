import axios from "axios";

export function createEjercicios(name, description, image, typology, muscle) {
  return axios.post("http://localhost:3000/api/v1/exercise", {
    name,
    description,
    image,
    typology,
    muscle,
  });
}
