import React, { useEffect } from "react";
import { LOCAL_STORAGE_USER } from "../constanst";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import viejita from "../../../public/videos/pexels-rodnae-productions-7017804 (1080p).mp4";
import "./adminRoute.css";

function AdminRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
    const token = user?.token;

    if (!token) {
      navigate("/join");
    } else {
      const { role } = jwt_decode(token);
      if (role !== "admin") {
        console.log("No eres un administrador");
      }
    }
  }, []);

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;
  const { role } = jwt_decode(token);

  if (!token) {
    navigate("/join");
    return null;
  }

  return (
    <>
      {role === "admin" ? (
        children
      ) : (
        <>
          <p className="NoAdminParrafo">
            ¡Tú no eres un administrador! ¡Date una vueltita, crack!
          </p>
          <video
            className="VideoNoAdmin"
            src={viejita}
            autoPlay
            loop
            muted
          ></video>
        </>
      )}
    </>
  );
}

export default AdminRoute;
