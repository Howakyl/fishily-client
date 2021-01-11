import axios from 'axios';


let endPoint;

if (process.env.NODE_ENV === 'production') {
    endPoint = `https://fishily-api.herokuapp.com/api/fishily/posts`
} else {
    endPoint = `http://localhost:4000/api/fishily/posts`
};

class PostModel {

    //GET all posts
    static all = () => {
        let request = axios.get(endPoint);
        return request;
    };

    //GET one post
    static getOne = (id) => {
        let request = axios.get(`${endPoint}/${id}`);
        return request;
    }

    //CREATE post
    static create = (post, userId) => {
        let request = axios.post(`${endPoint}/${userId}` , post);
        return request;
    }

    //DELETE post
    static delete(postId) {
        let request = axios.delete(`${endPoint}/${postId}`);
        return request;
    }

    //EDIT post
    static update(postId, updatedPost) {
        let request = axios.put(`${endPoint}/${postId}` , updatedPost);
        return request;
    }
};

export default PostModel;