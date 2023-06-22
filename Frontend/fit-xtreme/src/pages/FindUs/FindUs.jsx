import map from "../../../public/videos/map.mp4";
import "./findUs.css";
function FindUs() {
  return (
    <>
      <div className="findUs-container">
        <video className="video-map" src={map} autoPlay loop muted></video>
        <div className="Encuentra-container">
          <p>ENCUENTRA TU GYM</p>
          <div className="cities-container">
            <span>•Madrid•</span>
            <span>•Vigo•</span>
            <span>•Barcelona•</span>
            <span>•Málaga•</span>
          </div>

          <button className="Button-FindUs">
            <span>FitXtreme </span>
          </button>
        </div>
      </div>
    </>
  );
}
export default FindUs;
