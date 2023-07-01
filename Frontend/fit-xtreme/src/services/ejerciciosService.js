import axios from "axios";

export function createEjercicios(formData, config) {
  return axios.post("http://localhost:3000/api/v1/exercise", formData, config);
}

export function GetExercisebyMuscle(muscle) {
  return axios.get(`http://localhost:3000/api/v1/exercise/muscle/${muscle}`);
}

export function getProfile() {
  const response = axios.get("http://localhost:3000/api/v1/users/profile");
  return response;
}

export async function getFavoriteExercise() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/profile/favorites"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching Favorites", error);
  }
}

export function deletFavoriteExercise(idWorkout) {
  try {
    const response = axios.delete(
      `http://localhost:3000/api/v1/users/profile/${idWorkout}/favorites`
    );
    return response;
  } catch (error) {}
}
