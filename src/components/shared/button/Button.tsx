import classes from "./Button.module.css";

function Button(props: { text: string; click: Function }) {
  return (
    <button
      className={classes.btn}
      onClick={() => {
        props.click;
      }}
    >
      {props.text}
    </button>
  );
}

export default Button;
