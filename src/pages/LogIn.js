import React, { useState, useEffect } from "react";
import Input from '../components/UI/Input';
import UserModel from "../models/user";
import { Redirect } from "react-router-dom";

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking validity')
      if (username.length >= 4) {
        setUsernameIsValid(true);
      } else {
        setUsernameIsValid(false);
      }

      if (password.length >= 4) {
        setPasswordIsValid(true);
      } else {
        setPasswordIsValid(false);
      }
    }, 300);

    return () => {
      clearTimeout(identifier);
      console.log('clear')
    };
  }, [username, password]);

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
          <Input 
            label="Username"
            input={{
              id: "usernameInput",
              type: "text",
              placeholder: "Enter your username...",
              value: username,
            }}
            onChange={(e) => setUsername(e.target.value)}
            onIsValid={usernameIsValid}
          />
          <br />
          <Input
            label="Password"
            input={{
              id: "passInput",
              type: "password",
              placeholder: "Enter your password...",
              value: password
            }}
            onChange={(e) => setPassword(e.target.value)}
            onIsValid={passwordIsValid}
          />
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    );
  }
};

export default LogIn;
