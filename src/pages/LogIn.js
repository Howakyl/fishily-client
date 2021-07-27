import React, { useState } from "react";
import Input from '../components/UI/Input';
import UserModel from "../models/user";
import { Redirect } from "react-router-dom";

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsValid, setUserameIsValid] = useState(false);
  const [passwordIsValid, setpasswordIsValid] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      username: username,
      password: password,
    };
    UserModel.login(formData).then((res) => {
      if (res.data.error === 'incorrect password.') {
        console.log('password error')
      }
      if (res.data.error === 'no user found.') {
        console.log('username error')
      }
      props.setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    });
  };

  if (props.user.username) {
    return <Redirect to="/posts" />;
  } else {
    return (
      <div>
        <form className="container" onSubmit={handleFormSubmit}>
          <h1 className="logInTitle">Log In!</h1>
          {/* <div className="form-group">
            <label htmlFor="usernameInput">username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              id="usernameInput"
              value={username}
              name="username"
              pattern=".{4,}"
              title="Must be at least 4 characters long."
            />
          </div> */}
          <Input 
            label="Username"
            input={{
              id: "usernameInput",
              type: "text",
              placeholder: "Enter your username!",
              value: username,
            }}
            onChange={(e) => setUsername(e.target.value)}
            onIsValid={usernameIsValid}
          />
          <br />
          <div className="form-group">
            <label htmlFor="passInput">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="passInput"
              value={password}
              name="password"
              pattern=".{4,}"
              title="Must be at least 4 characters long."
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    );
  }
};

export default LogIn;
