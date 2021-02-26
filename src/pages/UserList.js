import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import UserModel from '../models/user';
import UserCard from '../components/UserCard';
import './UserList.css';

const UserList = (props) => {
    // state = {
    //     users: [],
    //     loading: true,
    // }

    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    // componentDidMount() {

    //     UserModel.all().then((res) => {

    //         this.setState({ 
    //             users: res.data.users,
    //             loading: false,
    //         })
    //     });
    // };

    useEffect(() => {
        UserModel.all().then((res) => {
            setUsers(res.data.users);
            setLoading(false);
        })
    } , []);

    function renderUsers () {
        
        return this.state.users.map((user) => {
            return (
                <li className="userList-card" key={user._id}>
                    <UserCard
                        user={user}
                    />
                </li>
            )
        })
    }


        if(!this.state.loading) {
            return (
                <div className="container">
                    <h2 className="userList-title">Fishily users:</h2>
                    <ul className="userList-container">
                    
                        {this.renderUsers()}
                    </ul>
                </div>
            )
        } else {
            return <Spinner />
        }
};

export default UserList;