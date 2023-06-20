import "./ejerciciosHome.css";
import ejerciciosVideo from "../../../public/videos/ejercicios-home.mp4";
function Ejercicios() {
  return (
    <>
      <div className="Ejercicios-container-home">
        <section className="video-container-ejercicios-home-description">
          <h2>Nuestras instalaciones</h2>
        </section>
        <section className="video-container-ejercicios-home">
          <video src={ejerciciosVideo} autoPlay loop muted></video>
        </section>
      </div>
    </>
  );
}

export default Ejercicios;
