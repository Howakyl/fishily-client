import React from "react";
import Comment from "../../components/Comments/Comment";
import classes from "./PostDetailComments.module.css";

const PostDetailComments = (props) => {
  const renderComments = () => {
    return props.comments.map((comment) => (
      <Comment comment={comment} key={comment._id} />
    )).reverse();
  };

  return (
    <div className={classes.commentsContainer}>
      {props.comments.length > 0 ? (
        renderComments()
      ) : (
        <h2 className={classes.commentsHeader}>No comments (yet!)</h2>
      )}
    </div>
  );
};
export default PostDetailComments;
