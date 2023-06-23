import ejerciciosVideo from "../../../public/videos/ejercicios-home.mp4";
import "./ejerciciosHome.css";
function Ejercicios() {
  return (
    <>
      <div className="Ejercicios-container-home">
        <section className="video-container-ejercicios-home-description">
          <h2>Nuestras instalaciones</h2>
          <div>
            <ul>
              <li>caca</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </section>
        <section className="video-container-ejercicios-home">
          <video src={ejerciciosVideo} autoPlay loop muted></video>
        </section>
      </div>
    </>
  );
}

export default Ejercicios;
