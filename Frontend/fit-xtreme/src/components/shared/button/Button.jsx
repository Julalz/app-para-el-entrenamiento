import "./button.css";
import propTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <button className="button">
      <span>{text}</span>
    </button>
  );
};

Button.propTypes = {
  text: propTypes.string,
};

export default Button;
