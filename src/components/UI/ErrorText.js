import classes from "./ErrorText.module.css";

const ErrorText = (props) => {
  return (
    <div className={`${props.className} ${classes.errorText}`}>
      <small>{props.children}</small>
    </div>
  );
};

export default ErrorText;
