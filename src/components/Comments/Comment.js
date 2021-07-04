import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "../UI/Tooltip";
import classes from "./Comment.module.css";

const Comment = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const date = new Date(props.comment.createdAt);
  const today = new Date();
  let diff = Math.abs(today - date);

  function getDiff(diff) {
    if (diff / 36e5 < 1) {
      // less than an hour ago
      return (diff = `${Math.floor(diff / 1000 / 60)}m`);
    } else if (diff / 36e5 < 24) {
      // Less than a day ago
      return (diff = `${Math.floor(diff / 36e5)}hr`);
    } else if (diff / 36e5 / 24 < 365) {
      // At least a day ago
      return (diff = `${Math.floor(diff / 36e5 / 24)}d`);
    } else {
      // At least a year ago
      return (diff = `${Math.floor(diff / 36e5 / 24 / 365)}y`);
    }
  }

  function onShowTooltip() {
    setShowTooltip(!showTooltip);
  }

  return (
    <div className={classes.commentContainer}>
      <Link to={`/users/${props.comment.user._id}`}>
        <img
          src={props.comment.user.picture}
          alt={props.comment.user.username}
          className={classes.userImg}
        />
      </Link>
      <div className={classes.commentInfo}>
        <section className={classes.commentHeader}>
          <Link to={`/users/${props.comment.user._id}`}>
            <p className={classes.commentUsername}>
              {props.comment.user.username}
            </p>
          </Link>
          <section className={classes.optionsContainer}>
            <small className={classes.postedOn}>{getDiff(diff)}</small>
            {props.comment.user._id === props.user._id && (
              <button
                className={classes.optionsBtn}
                type="button"
                onClick={onShowTooltip}
              >
                <i className={`fas fa-ellipsis-h ${classes.options}`}></i>
              </button>
            )}

            {showTooltip && (
              <Tooltip onShowTooltip={onShowTooltip}>
                <button
                  type="button"
                  className={classes.tooltipDelete}
                  onClick={() => {
                    props.onDeleteComment(props.comment._id);
                    onShowTooltip()
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                  <small>Delete</small>
                </button>
              </Tooltip>
            )}
          </section>
        </section>
        <p className={classes.commentDescription}>
          {props.comment.description}
        </p>
      </div>
    </div>
  );
};
export default Comment;
