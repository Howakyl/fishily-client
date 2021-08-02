import axios from "axios";

let endPoint: string;

if (process.env.NODE_ENV === "production") {
  endPoint = `https://fishily-api.herokuapp.com/api/fishily/comments`;
} else {
  endPoint = `http://localhost:4000/api/fishily/comments`;
}

interface Comment {
  description: string;
  _id?: string;
}

class CommentModel {
  // CREATE comment
  static create = (comment: Comment["description"], postId: string, userId: string) => {
    let data = {
      description: comment,
      user: userId,
    };
    let request = axios.post(`${endPoint}/${postId}`, data);
    return request;
  };

  // DELETE comment
  static delete = (commentId: Comment["_id"]) => {
    let request = axios.delete(`${endPoint}/${commentId}`);
    return request;
  };
}

export default CommentModel;
