import React from "react";
import { Link } from "react-router-dom";
import classes from "./PostDetailHeader.module.css";

interface Props {
  className: string;
  post: {
    image: string;
    title: string;
    fish: string;
    description: string;
    locationName: string;
    user: {
      picture: string;
      username: string;
      _id: string;
    };
  };
  onRenderBtns: () => JSX.Element | undefined;
}

const PostDetailHeader: React.FC<Props> = (props) => {
  return (
    <div className={`${classes.postHeaderContainer} ${props.className}`}>
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
        <p className={classes.postDescription}>{props.post.description}</p>
        <small>Caught at: {props.post.locationName}</small>
        <div className={classes.postDetailButtons}>{props.onRenderBtns()}</div>
      </section>
    </div>
  );
};
export default PostDetailHeader;
