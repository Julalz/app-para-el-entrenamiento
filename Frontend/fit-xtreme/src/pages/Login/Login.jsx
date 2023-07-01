import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services";
import Button from "../../components/shared/button/Button";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password);
      setError(response.data.message);
      setError(null);
      navigate("/profile");
    } catch (error) {
      console.log(error);
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
