import React, { useEffect, useState } from "react";
import PostModel from "../../models/post";
import { Redirect } from "react-router-dom";
import NewPostMap from "../../components/NewPostMap";
import Input from "../../components/UI/Input";

const NewPost = (props) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
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
    setLng(coordinates.longitude);
    setLat(coordinates.latitude);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (title.length > 0 && title.length <= 100) {
        setTitleIsValid(true);
      } else {
        setTitleIsValid(false);
      }

      if (description.length <= 300) {
        setDescriptionIsValid(true);
      } else {
        setDescriptionIsValid(false);
      }
      
      setFormIsValid(titleIsValid && descriptionIsValid)
    }, 200);

    return () => {
      clearTimeout(identifier)
    };
  },[title, titleIsValid, description])

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (formIsValid) {
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
    }
  };

  if (redirectToPosts) {
    return <Redirect to="/posts" />;
  }
  return (
    <div>
      <form className="container" onSubmit={handleFormSubmit}>
        <h1 className="newPost-title">submit a new post!</h1>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          input={{
            id: "titleInput",
            type: "text",
            name: "title",
            value: title,
            required: true,
          }}
          requiredText="required"
          onIsValid={titleIsValid}
        />

        <Input
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          input={{
            id: "descInput",
            type: "text",
            name: "description",
            required: true,
            value: description,
          }}
          requiredText="include a short description about your catch!"
          onIsValid={descriptionIsValid}
        />

        <Input
          onChange={(e) => setFish(e.target.value)}
          label="Fish Caught:"
          input={{
            id: "fishInput",
            type: "text",
            name: "fish",
            value: fish,
          }}
          onIsValid={true}
        />

        <h4 className="newPostMapTitle">
          Drag the pin to get your coordinates!
        </h4>
        <NewPostMap onGetCoordinates={onGetCoordinates} />

        <section className="row">
          <Input
            className="col"
            onChange={(e) => setLocationName(e.target.value)}
            label="Where Was Your Catch?"
            input={{
              id: "locationInput",
              type: "text",
              name: "locationName",
              value: locationName,
            }}
            onIsValid={true}
          />

          <Input
            onChange={(e) => setLat(e.target.value)}
            className="col"
            label="Latitude"
            input={{
              id: "latInput",
              name: "lat",
              value: lat,
              type: "number",
              step: ".01",
            }}
            onIsValid={true}
          />

          <Input
            onChange={(e) => setLng(e.target.value)}
            className="col"
            label="Longitude"
            input={{
              id: "lngInput",
              type: "number",
              name: "lng",
              value: lng,
              step: ".01",
            }}
            onIsValid={true}
          />
        </section>

        <Input
          onChange={(e) => setImage(e.target.value)}
          label="Submit a picture!"
          input={{
            id: "imageInput",
            value: image,
            name: "image",
            type: "text",
          }}
          onIsValid={true}
        />

        <button type="submit" className="btn btn-primary newPostBtn">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
