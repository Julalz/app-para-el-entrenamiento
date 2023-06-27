import { useForm } from "react-hook-form";

import Button from "../../components/shared/button/Button";
import "./login.css";

const Login = () => {
  const { register } = useForm();

  return (
    <section className="login-section">
      <h1 className="login-title">Login</h1>
      <form class="Form" autocomplete="off">
        <div class="input-animated">
          <input
            type="email"
            id="email"
            required
            placeholder="the placeholder"
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
          />
          <label htmlFor="password" class="label-name">
            <span class="content-name">Contraseña</span>
          </label>
        </div>
        <div className="button-container">
          <Button text="Continuar" />
        </div>
      </form>
    </section>
  );
};

export default Login;
