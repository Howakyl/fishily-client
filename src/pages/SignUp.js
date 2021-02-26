import React, { useState } from 'react';
import UserModel from '../models/user';
import { Redirect } from 'react-router-dom';

const SignUp = (props) => {

    const [ username, setUsername ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ redirectToLogin, setRedirectToLogin ] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
            bio: bio
        }
        UserModel.create(formData)
            .then(() => {
                setRedirectToLogin(true)
            })
    }

        if(redirectToLogin) {
            return <Redirect to='/login'/>
        }

        if(props.user.username) {
            return <Redirect to='/'/>
        } else {
            return (
                <div className="signupContainer">
                    <form className="container" onSubmit={handleFormSubmit}>
                        <h1>Sign Up!</h1>
                        <div className="form-group">
                            <label htmlFor="usernameInput">username</label>
                            <small className="form-text text-muted">required</small>
                            <input
                                onChange={e => setUsername(e.target.value)}
                                type="text" 
                                className="form-control" 
                                id="usernameInput"
                                value={username}
                                name="username"
                                pattern=".{4,}"
                                title="Must be at least 4 characters long."
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passInput">Password</label>
                            <small className="form-text text-muted">required</small>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                type="password" 
                                className="form-control" 
                                id="passInput"
                                value={password}
                                name="password"
                                pattern=".{4,}"
                                title="Must be at least 4 characters long."
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstNameInput">first name</label>
                            <input
                                onChange={e => setFirstName(e.target.value)}
                                type="text" 
                                className="form-control" 
                                id="firstNameInput"
                                value={firstName}
                                name="firstName" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastNameInput">last name</label>
                            <input
                                onChange={e => setLastName(e.target.value)}
                                type="text" 
                                className="form-control" 
                                id="lastNameInput" 
                                value={lastName}
                                name="lastName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bioInput">Create a bio:</label>
                            <textarea
                                onChange={e => setBio(e.target.value)}
                                type="text" 
                                className="form-control" 
                                id="bioInput" 
                                value={bio}
                                name="bio"
                                pattern=".{,200}"
                                title="Must be fewer than 200 characters long."
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </form>
                </div>
            )
        } 
    }


export default SignUp;