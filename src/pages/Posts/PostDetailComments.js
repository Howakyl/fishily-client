import React from 'react'
import Comment from '../../components/Comments/Comment';
import classes from './PostDetailComments.module.css';


const PostDetailComments = (props) => {
  console.log(props.comments)
  const renderComments = () => {
    return props.comments.map(comment => (
      <Comment comment={comment} key={comment._id}/>
    ))
  }

  return (
    <div className={classes.commentsContainer}>
      <h2>Comments</h2>
      {props.comments.length > 0 ? renderComments() : <h2>No comments (yet!)</h2>}
    </div>
  );
}
export default PostDetailComments;