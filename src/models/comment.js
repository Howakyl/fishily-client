import axios from "axios";

let endPoint;

if (process.env.NODE_ENV === "production") {
  endPoint = `https://fishily-api.herokuapp.com/api/fishily/comments`;
} else {
  endPoint = `http://localhost:4000/api/fishily/comments`;
}

class CommentModel {
  // CREATE comment
  static create = (comment, postId, userId) => {
    let data = {
      description: comment,
      user: userId,
    };
    let request = axios.post(`${endPoint}/${postId}`, data);
    return request;
  };

  // DELETE comment
  static delete = (commentId) => {
    let request = axios.delete(`${endPoint}/${commentId}`);
    return request;
  };
}

export default CommentModel;
