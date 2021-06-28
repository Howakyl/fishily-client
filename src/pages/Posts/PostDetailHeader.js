import React from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import classes from "./PostDetailHeader.module.css";

const PostDetailHeader = (props) => {
  return (
    <div className={`container ${classes.postHeaderContainer}`}>
      <img
        src={props.post.image}
        alt="fish"
        className={`img-fluid ${classes.postImg}`}
      />
      <section className={classes.description}>
        <div className={classes.userInfo}>
          <h2>{props.post.title}</h2>
          <Link to={`/users/${props.post.user._id}`}>
            <img
              className=" img-fluid"
              src={props.post.user.picture}
              alt={props.post.user.username}
            />
          </Link>
          <Link to={`/users/${props.post.user._id}`}>
            <p className={classes.postUser}>{props.post.user.username}</p>
          </Link>
        </div>
        <h5 className={classes.fishCaught}>
          <em>Fish Caught:</em> {props.post.fish}
        </h5>
        <hr />
        <p className="post-detail-description">{props.post.description}</p>
        <small>Caught at: {props.post.locationName}</small>
        <div className={classes.postDetailButtons}>{props.onRenderBtns()}</div>
      </section>
    </div>
  );
};
export default PostDetailHeader;
