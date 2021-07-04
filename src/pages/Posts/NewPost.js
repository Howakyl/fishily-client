import React, { useState } from "react";
import PostModel from "../../models/post";
import { Redirect } from "react-router-dom";
import NewPostMap from "../../components/NewPostMap";

const NewPost = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fish, setFish] = useState("");
  const [locationName, setLocationName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Fish_icon.svg/1200px-Fish_icon.svg.png"
  );
  const [redirectToPosts, setRedirectToPosts] = useState(false);
  
  const onGetCoordinates = (coordinates) => {
    setLng(coordinates.longitude)
    setLat(coordinates.latitude)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      title: title,
      description: description,
      fish: fish,
      locationName: locationName,
      lat: lat,
      lng: lng,
      image: image,
    };

    PostModel.create(formData, props.user._id).then((res) => {
      setRedirectToPosts(true);
    });
  };

  if (redirectToPosts) {
    return <Redirect to="/posts" />;
  }
  return (
    <div>
      <form className="container" onSubmit={handleFormSubmit}>
        <h1 className="newPost-title">submit a new post!</h1>
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

        <h4 className="newPostMapTitle">
          Drag the pin to get your coordinates!
        </h4>
        <NewPostMap onGetCoordinates={onGetCoordinates} />

        <section className="row">
          <div className="form-group col newPost-location">
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
            <label htmlFor="latInput">
              Latitude<span className="text-muted"> - required</span>
            </label>
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
            <label htmlFor="lngInput">
              Longitude<span className="text-muted"> - required</span>
            </label>
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

        <button type="submit" className="btn btn-primary newPostBtn">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
