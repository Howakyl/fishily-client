import React, { useState, useEffect } from "react";
import Input from '../components/UI/Input';
import UserModel from "../models/user";
import { Redirect } from "react-router-dom";

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking validity')

      if (!usernameIsValid) {
        document.getElementById("usernameInput").focus();
        setUsernameIsValid(false);
      }

      if (!passwordIsValid) {
        document.getElementById("passInput").focus();
        setPasswordIsValid(false);
      }
    }, 300);

    return () => {
      clearTimeout(identifier);
      console.log('clear')
    };
  }, [username, password, usernameIsValid, passwordIsValid]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (usernameIsValid && passwordIsValid) {
      const formData = {
        username: username,
        password: password,
      };
      UserModel.login(formData).then((res) => {
        if (res.data.error === 'incorrect password.') {
          console.log('password error')
          setPasswordIsValid(false);
        }
        if (res.data.error === 'no user found.') {
          console.log('username error');
          setUsernameIsValid(false);
        }
        props.setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    }
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
            onChange={(e) => {
              setUsername(e.target.value)
              setUsernameIsValid(true)
              }}
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
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordIsValid(true)
              }}
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
