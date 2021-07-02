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
        />
      ) : (
        <input
          {...props.input}
          className={`${props.className} form-control`}
          onChange={props.onChange}
        />
      )}
    </div>
  );
};
export default Input;
