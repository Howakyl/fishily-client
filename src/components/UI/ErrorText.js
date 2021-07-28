import classes from './ErrorText.module.css';

const ErrorText = (props) => {
  return (
    <small className={`${props.className} ${classes.errorText}`}>
      {props.children}
    </small>
  )
}

export default ErrorText