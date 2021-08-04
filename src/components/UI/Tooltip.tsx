import React from "react";
import classes from "./Tooltip.module.css";

interface Props {
  className?: string;
  onShowTooltip: () => void;
}

const Tooltip: React.FC<Props> = (props) => {
  return (
    <>
      <div
        className={classes.tooltipBackdrop}
        onClick={props.onShowTooltip}
      ></div>
      <div className={`${classes.tooltip} ${props.className}`}>
        {props.children}
      </div>
    </>
  );
};
export default Tooltip;
