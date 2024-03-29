import React, { useState, useEffect } from "react";
import CommentModel from "../../models/comment";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import Comment from "../../components/Comments/Comment";
import classes from "./PostDetailComments.module.css";

interface Props {
  user: {
    _id: string;
  };
  post: {
    _id: string;
  };
  comments: [
    {
      _id: string;
      description: string;
      createdAt: Date;
      user: {
        _id: string;
        username: string;
        picture: string;
      };
    }
  ];
  onDeleteComment: (id: string) => void;
  onAddComment: () => void;
}

interface IComment {
  description: string;
  _id: string;
}

const PostDetailComments: React.FC<Props> = (props) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [description, setDescription] = useState<IComment["description"]>("");
  const [commentIsValid, setCommentIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (description.length > 0 && description.length <= 300) {
        setCommentIsValid(true);
      } else {
        setCommentIsValid(false);
      }
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [description]);

  const onShowModal = () => {
    setShowCommentModal(false);
  };

  const renderComments = () => {
    return props.comments
      .map((comment) => (
        <Comment
          comment={comment}
          key={comment._id}
          user={props.user}
          onDeleteComment={props.onDeleteComment}
        />
      ))
      .reverse();
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentIsValid) {
      CommentModel.create(description, props.post._id, props.user._id).then(
        (res) => {
          setShowCommentModal(false);
          props.onAddComment();
          setDescription("");
        }
      );
    }
  };

  return (
    <div className={classes.commentsContainer}>
      {props.comments && props.comments.length > 0 ? (
        <div className={classes.commentsContainerInner}>
          {renderComments()}
          {props.user && (
            <button
              type="button"
              className={`${classes.openCommentBtn} btn btn primary`}
              onClick={() => {
                setShowCommentModal(true);
              }}
            >
              <small>Comment</small>
              <i className="fas fa-comment"></i>
            </button>
          )}
        </div>
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
        </div>
      )}
      {showCommentModal && (
        <Modal onShowModal={onShowModal} className={classes.commentModal}>
          <form onSubmit={submitHandler}>
            <Input
              input={{
                id: "descriptionInput",
                type: "text",
                textarea: "true",
                placeholder: "Add a comment....",
                value: description,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              onIsValid={commentIsValid}
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
              <button
                className={`btn btn-primary`}
                type="submit"
                disabled={!commentIsValid}
              >
                Send
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
export default PostDetailComments;
