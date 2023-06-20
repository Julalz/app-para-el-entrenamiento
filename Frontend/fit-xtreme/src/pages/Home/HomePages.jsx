import Ejercicios from "../EjerciciosHome/EjerciciosHome";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
function HomePages() {
  return (
    <>
      <Header />
      <img
        className="img-background"
        src="../../public/images/background2.png"
        alt="home-background"
      ></img>
      <Ejercicios />
      <Footer />
    </>
  );
}

export default HomePages;
