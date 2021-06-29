import React from "react";
import { Link } from "react-router-dom";
import classes from "./Comment.module.css";

const Comment = (props) => {
  const date = new Date(props.comment.createdAt);
  const today = new Date();
  let diff = Math.abs(today - date);
  // console.log('seconds: ', (diff / 1000))
  // console.log('minutes: ', (diff / 1000 / 60))
  // console.log('hours: ', (diff / 1000 / 60 / 60)) OR 36e5
  // console.log('DAY: ', Math.abs(today - date) / 36e5 / 24)

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
          <small>{getDiff(diff)}</small>
        </section>
        <p className={classes.commentDescription}>
          {props.comment.description}
        </p>
      </div>
    </div>
  );
};
export default Comment;
