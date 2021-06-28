import React from "react";
import { Link } from "react-router-dom";
import classes from "./Comment.module.css";

const Comment = (props) => {
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
        <p className={classes.commentUsername}>{props.comment.user.username}</p>
        <p className={classes.commentDescription}>
          {props.comment.description}
        </p>
      </div>
    </div>
  );
};
export default Comment;
