import React from "react";
import classes from "./Comment.module.css";

const Comment = (props) => {
  return (
    <div>
      <img src={props.comment.user.picture} alt={props.comment.user.username}  className={classes.userImg}/>
      <p className={classes.commentUsername}>{props.comment.user.username}</p>
      <p className={classes.commentDescription}>{props.comment.description}</p>
    </div>
  );
};
export default Comment;
