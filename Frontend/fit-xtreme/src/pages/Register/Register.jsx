import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import Button from "../../components/shared/button/Button";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signup(name, email, password);
      setError(response.data.data.message);
      console.log(response);

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 409) {
        setError(error.response.data.error);
      } else {
        setError("Error de conexión");
      }
    }
  };

  return (
    <section className="register-section">
      <h1 className="register-title">Registro</h1>
      <form onSubmit={handleForm} className="Form" autoComplete="off">
        <div className="input-animated">
          <input
            type="text"
            id="name"
            required
            pattern="\S+.*"
            placeholder="the placeholder"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name" className="label-name">
            <span className="content-name">Nombre</span>
          </label>
        </div>
        <div className="input-animated">
          <input
            type="email"
            id="email"
            required
            placeholder="the placeholder"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="label-email">
            <span className="content-email">Correo</span>
          </label>
        </div>
        <div className="input-animated">
          <input
            type="password"
            id="password"
            required
            pattern="\S+.*"
            placeholder="the placeholder"
            onChange={(e) => setPass(e.target.value)}
          />
          <label htmlFor="password" className="label-password">
            <span className="content-password">Contraseña</span>
          </label>
        </div>
        <div className="button-container">
          <Button text="Registrar" />
          {error && <p>{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default Register;
