import React from 'react'
import classes from './Comment.module.css';


const Comment = (props) => {
  return (
    <div>
      <p>{props.comment.description}</p>
    </div>
  );
}
export default Comment;