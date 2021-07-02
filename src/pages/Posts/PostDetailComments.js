import React, { useState, useEffect } from "react";
import CommentModel from "../../models/comment";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import Comment from "../../components/Comments/Comment";
import classes from "./PostDetailComments.module.css";

const PostDetailComments = (props) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [description, setDescription] = useState("");
  const [commentIsValid, setCommentIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking validity");
      if (description.length > 0 && description.length <= 300) {
        setCommentIsValid(true);
        console.log("valid");
      } else {
        setCommentIsValid(false);
        console.log("IS invalid");
      }
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [description, props.comments]);

  const onShowModal = () => {
    setShowCommentModal(false);
  };

  const renderComments = () => {
    return props.comments
      .map((comment) => <Comment comment={comment} key={comment._id} />)
      .reverse();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (commentIsValid) {
      console.log(description, "IS VALID");
      CommentModel.create(description, props.post._id, props.user._id);
    }
  };

  return (
    <div className={classes.commentsContainer}>
      {props.comments.length > 0 ? (
        renderComments()
      ) : (
        <div className={classes.noCommentsContainer}>
          <h2 className={classes.commentsHeader}>No comments (yet!)</h2>
          <button
            className={`btn btn-primary`}
            onClick={() => {
              setShowCommentModal(true);
            }}
          >
            Be the first to comment
          </button>
          {showCommentModal && (
            <Modal onShowModal={onShowModal} className={classes.commentModal}>
              <form onSubmit={submitHandler}>
                <Input
                  input={{
                    id: "descriptionInput",
                    type: "text",
                    textarea: "true",
                  }}
                  label="Add a comment..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <small>{description.length}/300</small>
                <div className={classes.buttonContainer}>
                  <button
                    className={`btn btn-primary ${classes.cancelButton}`}
                    type="button"
                    onClick={() => setShowCommentModal(false)}
                  >
                    Cancel
                  </button>
                  <button className={`btn btn-primary`} type="submit">
                    Send
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};
export default PostDetailComments;
