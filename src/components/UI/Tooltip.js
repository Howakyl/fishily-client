import React from "react";
import classes from "./Tooltip.module.css";

const Tooltip = (props) => {
  return (
    <>
      <div className={classes.tooltipBackdrop}></div>
      <div className={`${classes.tooltip} ${props.className}`}>
        {props.children}
      </div>
    </>
  );
};
export default Tooltip;
