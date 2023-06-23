import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePages from "./pages/Home/HomePages";
import JoinNow from "./pages/JoinNow/JoinNow";
import Register from "./pages/Register/Register";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/join" element={<JoinNow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
