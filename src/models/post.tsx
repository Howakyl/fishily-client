import axios from "axios";

let endPoint: string;

if (process.env.NODE_ENV === "production") {
  endPoint = `https://fishily-api.herokuapp.com/api/fishily/posts`;
} else {
  endPoint = `http://localhost:4000/api/fishily/posts`;
}

interface Post {
  title: string;
  description: string;
  fish: string;
  locationName: string;
  lat: number;
  lng: number;
  image: string;
  _id?: string;
}

class PostModel {
  //GET all posts
  static all = () => {
    let request = axios.get(endPoint);
    return request;
  };

  //GET one post
  static getOne = (id: Post["_id"]) => {
    let request = axios.get(`${endPoint}/${id}`);
    return request;
  };

  //CREATE post
  static create = (post: Post, userId: string) => {
    let request = axios.post(`${endPoint}/${userId}`, post);
    return request;
  };

  //DELETE post
  static delete(postId: Post["_id"]) {
    let request = axios.delete(`${endPoint}/${postId}`);
    return request;
  }

  //EDIT post
  static update(postId: Post["_id"], updatedPost: Post) {
    let request = axios.put(`${endPoint}/${postId}`, updatedPost);
    return request;
  }
}

export default PostModel;
