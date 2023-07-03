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
import UpdateExercise from "./pages/updateExercise/updateExercise";
import AdminRoute from "./utils/AdminRoute/AdminRoute";
import AuthRoute from "./utils/AuthRoute/AuthRoute";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/join" element={<JoinNow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/Ejercicios"
          element={
            <AuthRoute>
              <EjerciciosSelect />
            </AuthRoute>
          }
        />
        <Route path="/Ejercicios/:muscle" element={<ExerciseByMuscle />} />
        <Route path="/EjerciciosHome" element={<EjerciciosHome />} />
        <Route
          path="/updateExercise/:exerciseId"
          element={<UpdateExercise />}
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
