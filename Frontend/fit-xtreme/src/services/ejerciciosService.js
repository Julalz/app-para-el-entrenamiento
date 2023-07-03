import axios from "axios";

export function createEjercicios(formData, config) {
  return axios.post("http://localhost:3000/api/v1/exercise", formData, config);
}

export async function updateEjercicios(exerciseId, exerciseData) {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/exercise/${exerciseId}`,
      exerciseData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching exercise by ID", error);
  }
}

export async function GetExercisebyMuscle(muscle) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/exercise/muscle/${muscle}`
    );
    return response;
  } catch (error) {
    throw new Error("Error fetching exercise by muscle", error);
  }
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
