import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import UserModel from '../models/user';
import UserCard from '../components/UserCard';
import './UserList.css';

const UserList = (props) => {

    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        UserModel.all().then((res) => {
            setUsers(res.data.users);
            setLoading(false);
        })
    } , []);

    function renderUsers () {
        
        return users.map((user) => {
            return (
                <li className="userList-card" key={user._id}>
                    <UserCard
                        user={user}
                    />
                </li>
            )
        })
    }


        if(!loading) {
            return (
                <div className="container">
                    <h2 className="userList-title">Fishily users:</h2>
                    <ul className="userList-container">
                        {renderUsers()}
                    </ul>
                </div>
            )
        } else {
            return <Spinner />
        }
};

export default UserList;