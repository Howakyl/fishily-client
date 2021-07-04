import React from "react";
import { Link } from "react-router-dom";

const PostCard = (props) => {
  const postDate = new Date(props.post.date);
  const month = postDate.toLocaleString("en-US", { month: "long" });
  const day = postDate.toLocaleString("en-US", { day: "2-digit" });
  const year = postDate.getFullYear();

  return (
    <div className="card mb-3 postList-card" style={{ maxWidth: "440px" }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={props.post.image} className="card-img" alt="fish" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h4>
              <Link to={`posts/${props.post._id}`} className="card-title">
                {props.post.title}
              </Link>
            </h4>
            <div>
              <h6 className="post-list-username">
                <em>By: {props.post.user.username}</em>
              </h6>
              <Link to={`/users/${props.post.user._id}`}>
                <img
                  src={props.post.user.picture}
                  alt={props.post.user.username}
                  className="img-fluid postList-user-img"
                  id="post-list-user-img"
                />
              </Link>
            </div>
            <p className="card-text text-truncate post-card-description">{props.post.description}</p>
            <p className="card-text">
              <small className="text-muted">
                Posted On: {month} {day} {year}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
