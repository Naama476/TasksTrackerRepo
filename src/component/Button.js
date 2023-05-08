import App from "../App.css";
const Button = ({ text, onClick, comp }) => {
  return (
    <button className={comp === "G" ? "btn-comp" : "btn"} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
