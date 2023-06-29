import "./button.css";
import PropTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <button className="button">
      <span>{text}</span>
    </button>
  );
};

Button.PropTypes = {
  text: PropTypes.string,
};

export default Button;
