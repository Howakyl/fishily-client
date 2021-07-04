import React, { useState, useEffect } from "react";
import Spinner from "../../components/UI/Spinner";
import PostModel from "../../models/post";
import CommentModel from "../../models/comment";
import { Redirect, Link, withRouter } from "react-router-dom";
import "./PostDetail.css";
import PostDetailHeader from "./PostDetailHeader";
import PostDetailComments from "./PostDetailComments";

const PostDetail = (props) => {
  const [loading, setLoading] = useState(true);
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
    PostModel.delete(id).then((res) => {
      setRedirectToPosts(true);
    });
  };

  const deleteComment = (id) => {
    CommentModel.delete(id).then((res) => {
      setNewComment(id);
    });
  };

  console.log("test");

  function confirmPostDelete(post) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your post?"
    );
    if (confirmDelete === true) return deletePost(post);
  }

  function renderBtns() {
    if (props.user._id === post.user._id) {
      return (
        <>
          <span
            className="btn btn-primary"
            onClick={() => confirmPostDelete(post._id)}
          >
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
    );
  } else {
    return <Spinner />;
  }
};

export default withRouter(PostDetail);
