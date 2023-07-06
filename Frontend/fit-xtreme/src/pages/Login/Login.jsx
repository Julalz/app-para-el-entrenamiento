import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import Button from "../../components/shared/button/Button";
import "./login.css";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";

function Login({ setIsLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password);
      //setError(response.data.message);
      //setError(null);
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data));

      setIsLogged(true);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      localStorage.removeItem(LOCAL_STORAGE_USER);
      setError(error.response.data.error);
    }
  };

  return (
    <section className="login-section">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleForm} class="Form" autocomplete="off">
        <div class="input-animated">
          <input
            type="email"
            id="email"
            required
            placeholder="the placeholder"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" class="label-email">
            <span class="content-email">Email</span>
          </label>
        </div>
        <div class="input-animated">
          <input
            type="password"
            id="password"
            required
            pattern="\S+.*"
            placeholder="the placeholder"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" class="label-name">
            <span class="content-name">Contraseña</span>
          </label>
        </div>
        <div className="button-container">
          <Button text="Continuar" />
          {error && <p>{error}</p>}
        </div>
      </form>
    </section>
  );
}

export default Login;
