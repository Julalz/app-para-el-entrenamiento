import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePages from "./pages/Home/HomePages";
import JoinNow from "./pages/JoinNow/JoinNow";
import Register from "./pages/Register/Register";
import Ejercicios from "./pages/EjerciciosHome/EjerciciosHome";
import LocationGym from "./pages/LocationGym/LocationGym";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

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
        <Route path="/*" element={<NotFound />} />
        <Route path="/Ejercicios" element={<Ejercicios />} />
        <Route path="/LocationGym" element={<LocationGym />} />
      </Routes>
    </main>
  );
}

export default App;
