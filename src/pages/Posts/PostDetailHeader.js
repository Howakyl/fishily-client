import React from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import classes from "./PostDetailHeader.module.css";

const PostDetailHeader = (props) => {
  return (
    <div className={classes.postHeaderContainer}>
      <img src={props.post.image} alt="fish" className={`img-fluid ${classes.postImg}`} />
      <section className={classes.description}>
        <h2>{props.post.title}</h2>
        <div className={classes.userInfo}>
          <Link to={`/users/${props.post.user._id}`}>
            <img
              className=" img-fluid"
              src={props.post.user.picture}
              alt={props.post.user.username}
            />
          </Link>
          <Link to={`/users/${props.post.user._id}`}>
            <p className="">{props.post.user.username}</p>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default PostDetailHeader;
