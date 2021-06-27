import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../../components/UI/Spinner";
import UserModel from "../../models/user";
import "./UserShow.css";

const UserShow = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = props.match.params.id;
    UserModel.getOne(userId).then((res) => {
      setUser(res.data.user);
      setLoading(false);
    });
  }, [props.match.params.id]);

  function renderPosts() {
    if (user.posts.length > 0) {
      return user.posts
        .map((post, index) => {
          const postDate = new Date(post.date);
          const month = postDate.toLocaleString("en-US", { month: "long" });
          const day = postDate.toLocaleString("en-US", { day: "2-digit" });
          const year = postDate.getFullYear();
          return (
            <div
              className="card mb-3 userShow-post-card"
              style={{ maxWidth: "540px" }}
              key={index}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={post.image}
                    alt={post.fish}
                    className="user-detail-post-img img-fluid card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4>
                      <Link to={`/posts/${post._id}`} className="card-title">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="card-text text-truncate">
                      {post.description}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Posted On: {month} {day} {year}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
        .reverse();
    } else {
      return <h3>This user has no posts.</h3>;
    }
  }

  function renderBio() {
    if (user.bio.length > 0) {
      return <p>{user.bio}</p>;
    } else {
      return <p>This user has no bio.</p>;
    }
  }

  function renderBtns() {
    if (props.user._id === user._id) {
      return (
        <>
          <Link to={`/users/${user._id}/edit`} className="btn btn-primary">
            Edit Profile
          </Link>
          <Link to="/posts/new" className="btn btn-primary">
            New Post
          </Link>
        </>
      );
    }
  }

  if (!loading) {
    return (
      <div className="userShow-container">
        <section className="userShow-info">
          <img
            src={user.picture}
            alt={user.username}
            className="user-detail-img"
          />
          <h1 className="userShow-username">{user.username}</h1>
          <h5 className="userShow-name">
            {user.firstName} {user.lastName}
          </h5>
          <br />
          <div className="userShow-bio text-wrap text-break">{renderBio()}</div>
          <hr />
          <div className="userShow-btns">{renderBtns()}</div>
        </section>

        <section className="userShow-posts-container">
          <h3 className="userShow-posts-title">{user.username}'s Catches</h3>
          <hr />
          {renderPosts()}
        </section>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default withRouter(UserShow);
