import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
// import ProfilePages from "./pages/ProfilePages";
// import FavoritesPages from "./pages/FavoritePages";
// import NotFoundPages from "./pages/NotFoundPages";
import HomePages from "./pages/Home/HomePages";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<ProfilePages />} />
        <Route path="/favorites" element={<FavoritesPages />} />
        <Route path="/*" element={<NotFoundPages />} /> */}
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
