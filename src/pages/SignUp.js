import React, { useState, useEffect } from "react";
import Input from '../components/UI/Input';
import UserModel from "../models/user";
import { Redirect } from "react-router-dom";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [bioIsValid, setBioIsValid] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking validity')
      if (username.length > 3) {
        setUsernameIsValid(true)
      } else {
        setUsernameIsValid(false)
      }

      if (password.length > 3) {
        setPasswordIsValid(true)
      } else {
        setPasswordIsValid(false)
      }

      if (bio.length < 200) {
        setBioIsValid(true)
      } else {
        setBioIsValid(false)
      }
      setFormIsValid(usernameIsValid && passwordIsValid && bioIsValid)
    }, 200);

    return () => {
      console.log("cleanup")
      clearTimeout(identifier);
    }
  },[username, password, bio, usernameIsValid, passwordIsValid, bioIsValid])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    if (formIsValid) {
      const formData = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        bio: bio,
      };
      UserModel.create(formData).then(() => {
        setRedirectToLogin(true);
      });
    } else {
      if (!passwordIsValid) {
        document.getElementById("passInput").focus()
      } else if (!usernameIsValid) {
        document.getElementById("usernameInput").focus()
      } else if (!bioIsValid) {
        document.getElementById("bioInput").focus()
      }
    }
  };

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }

  if (props.user.username) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="signupContainer">
        <form className="container" onSubmit={handleFormSubmit}>
          <h1>Sign Up!</h1>
          <Input 
            label="username"
            input={{
              id: "usernameInput",
              type: "text",
              name: "username",
              required: true,
              value: username
            }}
            requiredText="Must be at least 4 characters long."
            onChange={(e) => setUsername(e.target.value)}
            onIsValid={usernameIsValid}
          />
          <Input 
            label="password"
            input={{
              id: "passInput",
              type: "password",
              name: "password",
              required: true,
              value: password
            }}
            requiredText="Must be at least 4 characters long."
            onChange={(e) => setPassword(e.target.value)}
            onIsValid={passwordIsValid}
          />
          <Input 
            label="first name"
            input={{
              id:"firstNameInput",
              type:"text",
              name:"firstName",
              value: firstName
            }}
            onChange={(e) => setFirstName(e.target.value)}
            onIsValid={true}
          />
          <Input 
            label="last name"
            input={{
              id:"lastNameInput",
              type:"text",
              name:"lastName",
              value: lastName
            }}
            onChange={(e) => setLastName(e.target.value)}
            onIsValid={true}
          />
          <Input 
            label="Create a bio:"
            input={{
              id: "bioInput",
              textarea: "true",
              name: "bio",
              required: true,
              value: bio
            }}
            requiredText="Must be fewer than 200 characters long."
            onChange={(e) => setBio(e.target.value)}
            onIsValid={bioIsValid}
          />
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>
      </div>
    );
  }
};

export default SignUp;
