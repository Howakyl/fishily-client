import React, { useState } from "react";
import Input from '../components/UI/Input';
import UserModel from "../models/user";
import { Redirect } from "react-router-dom";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
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
            // onIsValid={true}
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
            // onIsValid={true}
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
            // onIsValid={true}
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
            // onIsValid={true}
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
            // onIsValid={true}
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
