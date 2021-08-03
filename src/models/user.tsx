import axios from "axios";

let endPoint: string;
let logInEndPoint: string;

if (process.env.NODE_ENV === "production") {
  endPoint = `https://fishily-api.herokuapp.com/api/fishily/users`;
  logInEndPoint = `https://fishily-api.herokuapp.com/api/fishily/users/login`;
} else {
  endPoint = `http://localhost:4000/api/fishily/users`;
  logInEndPoint = `http://localhost:4000/api/fishily/users/login`;
}

interface User {
  username: string;
  firstName?: string;
  password?: string;
  lastName?: string;
  bio?: string;
  picture?: string;
}

interface NewUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
}

class UserModel {
  //GET all users
  static all = () => {
    let request = axios.get(endPoint);
    return request;
  };

  //GET one user
  static getOne = (id: string) => {
    let request = axios.get(`${endPoint}/${id}`);
    return request;
  };

  //CREATE user
  static create = (user: NewUser) => {
    let request = axios.post(endPoint, user);
    return request;
  };

  //UPDATE user
  static update(userId: string, updatedUser: User) {
    let request = axios.put(`${endPoint}/${userId}`, updatedUser);
    return request;
  }

  //LOGIN user
  static login = (user: User) => {
    let request = axios.post(logInEndPoint, user);
    return request;
  };

  //LOGOUT user
  static logout = () => {
    let request = axios.delete(logInEndPoint);
    return request;
  };
}

export default UserModel;
