import ejerciciosVideo from "../../../public/videos/ejercicios-home.mp4";
import Button from "../../components/shared/button/Button";
import "./ejerciciosHome.css";
function Ejercicios() {
  return (
    <>
      <div className="Ejercicios-container-home">
        <section className="video-container-ejercicios-home-description">
          <h2>
            Porque somos <br></br> Xtreme
          </h2>
          <div>
            <ul className="container-tarjetas">
              <li>
                <img
                  src="../../../public/images/iconos/icons8-gym-64.png"
                  alt="gymhouse"
                ></img>
                <h3>4 gym en toda españa</h3>
                <p>
                  Con tu suscripcion Premiun puedes entrenar en cualquier
                  gymnasio
                </p>
              </li>
              <li>
                <img
                  src="../../../public/images/iconos/icons8-hexagon-synchronize-64.png"
                  alt="gymhouse"
                ></img>
                <h3>7 zonas </h3>
                <p>
                  Nuestros gimnasios estan divididos en 7 zonas de entrenamiento
                  en las que puedes entrenar segun el objetivo que tengas
                </p>
              </li>
              <li>
                <img
                  src="../../../public/images/iconos/icons8-gym-66.png"
                  alt="gymhouse"
                ></img>
                <h3>Ultima generacion</h3>
                <p>
                  Entrena con maquinaria de ultima generacion de Matrix y
                  Technogym
                </p>
              </li>
              <li>
                <img
                  src="../../../public/images/iconos/icons8-gym-49.png"
                  alt="gymhouse"
                ></img>
                <h3>app 360</h3>
                <p>
                  Contamos con clases virtuales y presenciales en la mayoria de
                  nuestros gimnasios. nuestra app Fit-Xtreme
                </p>
              </li>
              <li>
                <img
                  src="../../../public/images/iconos/icons8-teléfono-64.png"
                  alt="gymhouse"
                ></img>
                <h3>App 360</h3>
                <p>
                  Entrena seguro en Fit-Xtreme, desinfectamos el gimnasio a
                  menudo. Ademas contamos con estaciones de higiene para limpiar
                  el material.
                </p>
              </li>
            </ul>
          </div>{" "}
          <div className="apuntateAhora">
            <Button />
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
