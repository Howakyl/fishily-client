import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

interface Props {
  className: string;
  onShowModal: () => void;
}

const Modal: React.FC<Props> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className={classes.backdrop} onClick={props.onShowModal}></div>
          <div className={`${classes.modal} ${props.className}`}>
            {props.children}
          </div>
        </>,
        document.getElementById("modal-root")!
      )}
    </>
  );
};
export default Modal;