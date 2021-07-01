import React, { useState } from "react";
import Modal from '../../components/UI/Modal';
import Comment from "../../components/Comments/Comment";
import classes from "./PostDetailComments.module.css";

const PostDetailComments = (props) => {
  const [ showCommentModal, setShowCommentModal ] = useState(false);

  const onShowModal = () => {
    setShowCommentModal(false)
  }

  const renderComments = () => {
    return props.comments
      .map((comment) => <Comment comment={comment} key={comment._id} />)
      .reverse();
  };

  return (
    <div className={classes.commentsContainer}>
      {props.comments.length > 0 ? (
        renderComments()
      ) : (
        <div className={classes.noCommentsContainer}>
          <h2 className={classes.commentsHeader}>No comments (yet!)</h2>
          <button className={`btn btn-primary`} onClick={() => {setShowCommentModal(true)}}>Be the first to comment</button>
          {showCommentModal && <Modal onShowModal={onShowModal}>this is a modal</Modal>}
        </div>
      )}
    </div>
  );
};
export default PostDetailComments;
