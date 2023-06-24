import Button from "../../../src/components/shared/button/Button";
import "./locationGym.css";
function LocationGym() {
  return (
    <div className="locationGym-container">
      <ul className="ul-container">
        <li>
          <img
            src="../../../public/images/locationGym/bank_0fb6ea9ac4.jpg"
            alt="MadridXtreme"
          ></img>
          <h3>MADRID</h3>
          <p>
            <Button text={"Reserva"} />
          </p>
        </li>
        <li>
          <img
            src="../../../public/images/locationGym/farringdon_f9597125d1.jpg"
            alt="MadridXtreme"
          ></img>
          <h3>VIGO</h3>
          <p>
            <Button text={"Reserva"} />
          </p>
        </li>
        <li>
          <img
            src="../../../public/images/locationGym/victoria_040b4eb1fb.jpg"
            alt="MadridXtreme"
          ></img>
          <h3>BARCELONA</h3>
          <p>
            <Button text={"Reserva"} />
          </p>
        </li>
        <li>
          <img
            src="../../../public/images/locationGym/westfield_aade7df589.jpg"
            alt="MadridXtreme"
          ></img>
          <h3>MALAGA</h3>
          <p>
            <Button text={"Reserva"} />
          </p>
        </li>
      </ul>
    </div>
  );
}
export default LocationGym;
