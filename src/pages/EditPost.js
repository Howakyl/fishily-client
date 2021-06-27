import React, { useEffect, useState } from "react";
import Spinner from "../components/UI/Spinner";
import PostModel from "../models/post";
import "./EditPost.css";

const EditPost = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fish, setFish] = useState("");
  const [locationName, setLocationName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const postId = props.match.params.id;
    PostModel.getOne(postId).then((data) => {
      const res = data.data.post;
      setTitle(res.title);
      setDescription(res.description);
      setFish(res.fish);
      setLocationName(res.locationName);
      setLat(res.lat);
      setLng(res.lng);
      setImage(res.image);
      setLoading(false);
    });
  }, [props.match.params.id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const postId = props.match.params.id;

    const formData = {
      title: title,
      description: description,
      fish: fish,
      locationName: locationName,
      lat: lat,
      lng: lng,
      image: image,
    };

    PostModel.update(postId, formData).then((res) => {
      props.history.push(`/posts/${postId}`);
    });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <form className="container editPost-form" onSubmit={handleFormSubmit}>
        <h1>Edit your post!</h1>
        <div className="form-group">
          <label htmlFor="titleInput">Title</label>
          <small className="form-text text-muted">required</small>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            id="titleInput"
            value={title}
            name="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descInput">Description</label>
          <small className="form-text text-muted">
            include a short description about your catch!
          </small>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control"
            id="descInput"
            value={description}
            name="description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fishInput">Fish Caught:</label>
          <input
            onChange={(e) => setFish(e.target.value)}
            type="text"
            className="form-control"
            id="fishInput"
            value={fish}
            name="fish"
          />
        </div>

        <section className="row">
          <div className="form-group col editPost-location">
            <label htmlFor="locationInput">Where Was Your Catch?</label>
            <input
              onChange={(e) => setLocationName(e.target.value)}
              type="text"
              className="form-control"
              id="locationInput"
              value={locationName}
              name="locationName"
            />
          </div>
          <div className="form-group col">
            <label htmlFor="latInput">Latitude</label>
            <input
              onChange={(e) => setLat(e.target.value)}
              type="number"
              className="form-control"
              id="latInput"
              value={lat}
              name="lat"
              step=".01"
            />
          </div>
          <div className="form-group col">
            <label htmlFor="lngInput">Longitude</label>
            <input
              onChange={(e) => setLng(e.target.value)}
              type="number"
              className="form-control"
              id="lngInput"
              value={lng}
              name="lng"
              step=".01"
            />
          </div>
        </section>

        <div className="form-group">
          <label htmlFor="imageInput">Submit a picture!</label>
          <input
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="form-control"
            id="imageInput"
            value={image}
            name="image"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Edit Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
