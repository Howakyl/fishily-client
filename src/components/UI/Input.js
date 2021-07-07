import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={` form-group ${classes.input}`}>
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
          placeholder={props.placeholder}
        />
      ) : (
        <input
          {...props.input}
          className={`${props.className} form-control ${
            !props.onIsValid ? classes.invalid : ""
          }`}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      )}
    </div>
  );
};
export default Input;
