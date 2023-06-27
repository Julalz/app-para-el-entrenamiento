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
      await signup(name, email, password);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Array.isArray(error.response.data)
          ? error.response.data[0]
          : error.response.data;

        console.log(errorMessage);
        setError(errorMessage);
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
          {error ? <p>{error.error}</p> : null}
        </div>
      </form>
    </section>
  );
};

export default Register;
