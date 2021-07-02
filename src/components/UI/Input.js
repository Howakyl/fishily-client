import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={` form-group ${classes.input}`}>
      <label htmlFor={props.input.id} className={classes.label}>
        {props.label}
      </label>
      {props.input.textarea === "true" ? (
        <textarea
          {...props.input}
          className={`${props.className} form-control`}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      ) : (
        <input
          {...props.input}
          className={`${props.className} form-control`}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      )}
    </div>
  );
};
export default Input;
