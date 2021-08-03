import React from "react";
import classes from "./Input.module.css";

interface Props {
  className?: string;
  input: {
    id: string;
    placeholder?: string;
    required?: boolean;
    textarea?: string;
    type?: string;
    name?: string;
    value?: string;
    step?: string;
  }
  label?: string;
  onIsValid: boolean;
  requiredText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

const Input: React.FC<Props> = (props) => {
  return (
    <div className={`form-group ${classes.input} ${props.className}`}>
      <label htmlFor={props.input.id} className={classes.label}>
        {props.label}
      </label>
      {props.input.required === true && (
        <small className="form-text text-muted">{props.requiredText}</small>
      )}
      {props.input.textarea === "true" ? (
        <textarea
          {...props.input}
          className={`${props.className} form-control ${
            !props.onIsValid ? classes.invalid : ""
          }`}
          onChange={props.onChange}
        />
      ) : (
        <input
          {...props.input}
          className={`${props.className} form-control ${
            !props.onIsValid ? classes.invalid : ""
          }`}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      )}
    </div>
  );
};
export default Input;
