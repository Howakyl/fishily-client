import React, { useState, useEffect } from "react";
import Input from "../components/UI/Input";
import ErrorText from "../components/UI/ErrorText";
import UserModel from "../models/user";
import { Redirect } from "react-router-dom";

interface Props {
  user: {
    username: string;
  };
  setUser: (res: Response) => void;
}

const LogIn: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (!usernameIsValid) {
        document.getElementById("usernameInput")!.focus();
        setUsernameIsValid(false);
      }

      if (!passwordIsValid) {
        document.getElementById("passInput")!.focus();
        setPasswordIsValid(false);
      }
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [username, password, usernameIsValid, passwordIsValid]);

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameIsValid && passwordIsValid) {
      const formData = {
        username: username,
        password: password,
      };
      UserModel.login(formData).then((res) => {
        if (res.data.error === "incorrect password.") {
          setPasswordIsValid(false);
        }
        if (res.data.error === "no user found.") {
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
          {usernameIsValid ? (
            <ErrorText />
          ) : (
            <ErrorText>Username is does not exist.</ErrorText>
          )}
          <Input
            label="Username"
            input={{
              id: "usernameInput",
              type: "text",
              placeholder: "Enter your username...",
              value: username,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
              setUsernameIsValid(true);
            }}
            onIsValid={usernameIsValid}
          />
          <br />
          {passwordIsValid ? (
            <ErrorText />
          ) : (
            <ErrorText>incorrect password.</ErrorText>
          )}
          <Input
            label="Password"
            input={{
              id: "passInput",
              type: "password",
              placeholder: "Enter your password...",
              value: password,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              setPasswordIsValid(true);
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
