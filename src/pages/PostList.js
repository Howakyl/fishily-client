import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import FishMap from "../components/FishMap";
import Spinner from "../components/UI/Spinner";
import PostModel from "../models/post";
import "./PostList.css";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PostModel.all().then((res) => {
      setPosts(res.data.posts);
      setLoading(false);
    });
  }, []);

  function renderPosts() {
    return posts
      .map((post) => {
        return <PostCard post={post} key={post._id} />;
      })
      .reverse();
  }

  if (!loading) {
    return (
      <div className="postList-wrapper">
        <div className="mapBoxContainer">
          <FishMap posts={posts} />
        </div>
        <div className="postList-container container">
          <h3 className="postList-title">Recent Posts:</h3>

          <hr />
          {renderPosts()}
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default PostList;
