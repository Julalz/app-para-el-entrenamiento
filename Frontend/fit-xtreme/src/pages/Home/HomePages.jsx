import Ejercicios from "../EjerciciosHome/EjerciciosHome";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FindUs from "../FindUs/FindUs";
import BackgroundHome from "../BackgroundHome/BackgroundHome";
function HomePages() {
  return (
    <>
      <Header />
      <BackgroundHome />
      <Ejercicios />
      <FindUs />
      <Footer />
    </>
  );
}

export default HomePages;
