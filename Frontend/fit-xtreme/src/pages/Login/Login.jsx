import { useForm } from "react-hook-form";

import Button from "../../components/shared/button/Button";
import "./login.css";
import { login } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      setError(response.data.data.message);
      console.log(response);

      // navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response.data.status === 403) {
        setError(error.response.data.error);
      } else {
        setError("Error de conexión");
      }
    }
  };

  return (
    <section className="login-section">
      <h1 className="login-title">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="Form"
        autoComplete="off"
      >
        <div className="input-animated">
          <input
            type="email"
            {...register("email")}
            id="email"
            required
            placeholder="the placeholder"
          />
          <label htmlFor="email" className="label-email">
            <span className="content-email">Email</span>
          </label>
        </div>
        <div className="input-animated">
          <input
            type="password"
            {...register("password")}
            id="password"
            required
            pattern="\S+.*"
            placeholder="the placeholder"
          />
          <label htmlFor="password" className="label-name">
            <span className="content-name">Contraseña</span>
          </label>
        </div>
        <div className="button-container">
          <Button text="Continuar" />
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
};

export default Login;
