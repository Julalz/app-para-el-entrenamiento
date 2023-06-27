import Proptypes from "prop-types";

function InputText({ label, register, errors }) {
  return (
    <>
      <label>{label}</label>
      <input type="text" {...register} />
      {errors.email?.type === "required" && (
        <span>Este campo es requerido</span>
      )}
      {errors.email?.type === "maxLength" && (
        <span>Este campo no debe sobrepasar 20 digitos</span>
      )}
    </>
  );
}

InputText.proTypes = {
  label: PropTypes.string,
  register: PropTypes.func,
  errors: PropTypes.obj,
};

export default InputText;
