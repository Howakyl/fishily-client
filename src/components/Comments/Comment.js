import React from "react";
import classes from "./Comment.module.css";

const Comment = (props) => {
  return (
    <div>
      <img src={props.comment.user.picture} alt={props.comment.user.username}  className={classes.userImg}/>
      <p>{props.comment.user.username}</p>
      <p>{props.comment.description}</p>
    </div>
  );
};
export default Comment;
