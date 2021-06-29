import React from "react";
import { Link } from "react-router-dom";
import classes from "./Comment.module.css";

const Comment = (props) => {
  const date = new Date(props.comment.createdAt)
  const today = new Date()
  // console.log(Math.abs(today - date) / 36e5)
  let diff = Math.abs(today - date)
  // console.log('seconds: ', (diff / 1000))
  // console.log('minutes: ', (diff / 1000 / 60))
  console.log('hours: ', (diff / 1000 / 60 / 60))
  if ((diff / 1000 / 60 / 60) < 24) {
    diff = `${Math.floor((diff / 1000 / 60 / 60))}hr`
  }
  console.log(diff)
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
        <section>
          <Link to={`/users/${props.comment.user._id}`}>
            <p className={classes.commentUsername}>
              {props.comment.user.username}
            </p>
          </Link>
          <small>{diff}</small>
        </section>
        <p className={classes.commentDescription}>
          {props.comment.description}
        </p>
      </div>
    </div>
  );
};
export default Comment;
