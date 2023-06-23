import Button from "../../components/shared/button/Button";
import "./register.css";

const Register = () => {
  const handleForm = (e) => {
    event.preventDefault();
  };
  return (
    <section className="register-section">
      <h1 className="register-title">Registro</h1>
      <form class="Form" autocomplete="off">
        <div class="input-animated">
          <input
            type="text"
            id="name"
            required
            pattern="\S+.*"
            placeholder="the placeholder"
          />
          <label htmlFor="name" class="label-name">
            <span class="content-name">Nombre</span>
          </label>
        </div>
        <div class="input-animated">
          <input
            type="email"
            id="email"
            required
            placeholder="the placeholder"
          />
          <label htmlFor="email" class="label-email">
            <span class="content-email">Correo</span>
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
          <label htmlFor="password" class="label-password">
            <span class="content-password">Contraseña</span>
          </label>
        </div>
        <div className="button-container">
          <Button text="Registrar" />
        </div>
      </form>
    </section>
  );
};
export default Register;
