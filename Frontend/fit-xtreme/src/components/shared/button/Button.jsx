import "./button.css";
import PropTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <button className="button" method>
      <span>{text}</span>
    </button>
  );
};

Button.PropTypes = {
  text: PropTypes.string,
};

export default Button;
