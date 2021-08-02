import React from "react";
import { Link } from "react-router-dom";

interface Props {
  user: {
    bio?: string;
    picture: string;
    _id: string;
    username: string;
  };
}

const UserCard: React.FC<Props> = ({ user }) => {
  function bioText() {
    if (user.bio) {
      return user.bio;
    } else {
      return <p>This user has no bio.</p>;
    }
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={user.picture} className="card-img-top" alt="user" />
      <div className="card-body">
        <h5 className="card-title text-truncate">{user.username}</h5>
        <div className="card-text text-truncate">{bioText()}</div>
        <Link to={`users/${user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
