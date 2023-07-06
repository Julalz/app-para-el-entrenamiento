import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/ejerciciosService";
import "./VerificationAccount.css";

function VerificationAccount() {
  console.log("asdasfd");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerifyCode = async () => {
      try {
        const responseProfile = await getProfile();
        const { verificationCode } = await getProfile();
        console.log(verificationCode);
        setData(responseProfile.data);
        console.log("seteadondData");
      } catch (error) {
        setError("Error fetching profile");
      }
    };

    fetchVerifyCode();
  }, []);

  return (
    <div className="papa">
      {data ? <p>Verificado</p> : <p>Cargando...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerificationAccount;
