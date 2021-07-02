import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={` form-group ${classes.input}`}>
      <label htmlFor={props.input.id} className={props.className}>
        {props.label}
      </label>
      <input {...props.input} className={`${props.className} form-control`} />
    </div>
  );
};
export default Input;
