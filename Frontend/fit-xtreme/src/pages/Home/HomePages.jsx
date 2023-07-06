import EjerciciosHome from "../EjerciciosHome/EjerciciosHome";
import Footer from "../../components/Footer/Footer";
import FindUs from "../FindUs/FindUs";
import BackgroundHome from "../BackgroundHome/BackgroundHome";
function HomePages() {
  return (
    <>
      <BackgroundHome />
      <EjerciciosHome />
      <FindUs />
      <Footer />
    </>
  );
}

export default HomePages;
