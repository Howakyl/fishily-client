import React, { useState, useEffect } from "react";
import Spinner from "../../components/UI/Spinner";
import Modal from "../../components/UI/Modal";
import PostModel from "../../models/post";
import CommentModel from "../../models/comment";
import { Redirect, Link, withRouter } from "react-router-dom";
import "./PostDetail.css";
import PostDetailHeader from "./PostDetailHeader";
import PostDetailComments from "./PostDetailComments";

const PostDetail = (props) => {
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [redirectToPosts, setRedirectToPosts] = useState(false);
  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState("");

  const onAddComment = (comment) => {
    setNewComment(comment._id);
  };

  useEffect(() => {
    const postId = props.match.params.id;
    PostModel.getOne(postId).then((data) => {
      setPost(data.data.post);
      setLoading(false);
    });
  }, [props.match.params.id, newComment]);

  const deletePost = (id) => {
    PostModel.delete(id);
  };

  const deleteComment = (id) => {
    CommentModel.delete(id).then((res) => {
      setNewComment(id);
    });
  };

  const onShowDeleteModal = () => {
    setshowDeleteModal(!showDeleteModal);
  };

  function renderBtns() {
    if (props.user._id === post.user._id) {
      return (
        <>
          <span className="btn btn-primary" onClick={() => onShowDeleteModal()}>
            Delete Post
          </span>

          <Link
            to={`/posts/${post._id}/edit`}
            className="btn btn-primary post-detail-edit-btn"
          >
            Edit Post
          </Link>
        </>
      );
    }
  }

  if (redirectToPosts) {
    return <Redirect to="/posts" />;
  }

  if (!loading) {
    return (
      <>
        {showDeleteModal && (
          <Modal onShowModal={onShowDeleteModal}>
            <h4 className="deletePostTitle">
              Are you sure you want to delete your post?
            </h4>
            <div className="postDeleteBtnContainer">
              <button
                className="btn btn-primary cancelPostDeleteBtn"
                type="button"
                onClick={() => {
                  setshowDeleteModal();
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary confirmPostDeleteBtn"
                type="button"
                onClick={() => {
                  deletePost(post._id);
                  setshowDeleteModal();
                  setRedirectToPosts(true);
                }}
              >
                Confirm
              </button>
            </div>
          </Modal>
        )}
        <div className="postDetailContainer">
          <PostDetailHeader
            post={post}
            onRenderBtns={renderBtns}
            className="postHeader"
          />
          <PostDetailComments
            comments={post.comments}
            post={post}
            user={props.user}
            onAddComment={onAddComment}
            onDeleteComment={deleteComment}
          />
        </div>
      </>
    );
  } else {
    return <Spinner />;
  }
};

export default withRouter(PostDetail);
