import axios from "axios";

export function createEjercicios(formData, config, token) {
  return axios.post("http://localhost:3000/api/v1/exercise", formData, {
    ...config,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteExercise(exerciseId, config, token) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/exercise/${exerciseId}`,
      { ...config, headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching exercise by ID");
  }
}

export async function updateEjercicios(
  exerciseId,
  exerciseData,
  config,
  token
) {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/exercise/${exerciseId}`,
      exerciseData,
      { ...config, headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching exercise by ID", error);
  }
}

export async function GetExercisebyMuscle(muscle, token) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/exercise/muscle/${muscle}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("backend", response);
    return response;
  } catch (error) {
    throw new Error("Error fetching exercise by muscle", error);
  }
}

export function getProfile(token) {
  const response = axios.get(
    "http://localhost:3000/api/v1/users/profile",
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response;
}

export async function getFavoriteExercise(token) {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/profile/favorites",
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching favorites", error);
  }
}

export async function addFavoriteExercise(idWorkout, token) {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/users/profile/${idWorkout}/favorites`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching favorites", error);
  }
}

export async function deletFavoriteExercise(idWorkout, token) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/users/profile/${idWorkout}/favorites`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );
    return response;
  } catch (error) {
    throw new Error("Error fetching favorites", error);
  }
}

// export async function UploadAvatar(token) {
//   await axios.put("http://localhost:3000/api/v1/users/profile", formData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }
export async function VerificationCode(Code, token) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/activation/${Code}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );
    console.log(response);
  } catch (error) {
    throw new Error("Error Codigo de verificacion", error);
  }
}
