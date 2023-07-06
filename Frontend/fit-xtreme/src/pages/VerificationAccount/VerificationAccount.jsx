import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/ejerciciosService";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";
import "./VerificationAccount.css";

function VerificationAccount() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;
  console.log(token);

  useEffect(() => {
    const fetchVerifyCode = async (code, token) => {
      try {
        if (token) {
          const responseProfile = await getProfile(token);
          setData(responseProfile.data);
        }
      } catch (error) {
        setError("Error fetching profile");
      }
    };

    if (token) {
      fetchVerifyCode(code, token);
    }
  }, []);

  return (
    <div className="papa">
      {data ? <p>Verificado</p> : <p>Cargando...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerificationAccount;
