import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePages from "./pages/Home/HomePages";
import JoinNow from "./pages/JoinNow/JoinNow";
import Register from "./pages/Register/Register";
import EjerciciosSelect from "./pages/EjerciciosSelect/EjerciciosSelect";
import LocationGym from "./pages/LocationGym/LocationGym";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import CreateExercise from "./pages/CreateExercise/CreateExercise";
import EjerciciosHome from "./pages/EjerciciosHome/EjerciciosHome";
import ExerciseByMuscle from "./pages/ExerciseByMuscle/ExerciseByMuscle";
import AdminRoute from "./utils/AdminRoute/AdminRoute";
import AuthRoute from "./utils/AuthRoute/AuthRoute";
import UpdateExercise from "./pages/UpdateExercise/UpdateExercise";
import VerificationAccount from "./pages/VerificationAccount/VerificationAccount";
import { LOCAL_STORAGE_USER } from "./utils/constanst";
import { useState } from "react";

function App() {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  const [isLogged, setIsLogged] = useState(!!token);

  return (
    <main>
      <Header setIsLogged={setIsLogged} isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/join" element={<JoinNow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/Ejercicios"
          element={
            <AuthRoute>
              <EjerciciosSelect />
            </AuthRoute>
          }
        />
        <Route
          path="/Ejercicios/:muscle"
          element={
            <AuthRoute>
              <ExerciseByMuscle />
            </AuthRoute>
          }
        />
        <Route
          path="/EjerciciosHome"
          element={
            <AuthRoute>
              <EjerciciosHome />
            </AuthRoute>
          }
        />
        <Route
          path="/updateExercise/:exerciseId"
          element={
            <AdminRoute>
              <UpdateExercise />
            </AdminRoute>
          }
        />
        <Route
          path="/CreateExercise"
          element={
            <AdminRoute>
              <CreateExercise />
            </AdminRoute>
          }
        />
        <Route path="/LocationGym" element={<LocationGym />} />
        <Route
          path="/VerificationAccount/:code"
          element={<VerificationAccount />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
