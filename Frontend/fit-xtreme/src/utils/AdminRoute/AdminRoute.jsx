import { LOCAL_STORAGE_USER } from "../constanst";
import jwt_decode from "jwt-decode";
import "./adminRoute.css";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  const { role } = jwt_decode(token);

  if (role !== "admin") {
    return (
      <>
        <p className="NoAdminParrafo">
          TUUUU!! No eres Admin! Date una vueltita Crack!
        </p>
        <video
          className="VideoNoAdmin"
          src="../../../public/videos/pexels-rodnae-productions-7017804 (1080p).mp4"
          autoPlay
          loop
          muted
        >
          vdvdv
        </video>
      </>
    );
  }

  return children;
}

export default AdminRoute;
