import classes from "./ErrorText.module.css";

interface Props {
  className: string;
}

const ErrorText: React.FC<Props> = (props) => {
  return (
    <div className={`${props.className} ${classes.errorText}`}>
      <small>{props.children}</small>
    </div>
  );
};

export default ErrorText;
