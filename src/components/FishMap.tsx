import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker, Popup, FlyToInterpolator, ViewportProps } from "react-map-gl";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface Props {
  posts: IPost[];
}

interface IPostState {
  post?: IPost;
}

interface IPost {
  lat: number;
  lng: number;
  locationName: string;
  image: string;
  title: string;
  user: {
    username: string;
  }
  fish: string;
  _id: string;
}

const FishMap: React.FC<Props> = (props) => {
  // @ts-ignore
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 10,
    // @ts-ignore
    width: "100vw",
    // @ts-ignore
    height: "60vh",
  });

  const [selectedPost, setSelectedPost] = useState<IPostState["post"]>(undefined);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPost(undefined);
      }
    };
    window.addEventListener("keydown", listener);

    //removes event listener on unmount
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  function displayCatchLocation() {
    if (selectedPost && selectedPost.locationName) {
      return (
        <small className="mr-3">Caught At: {selectedPost.locationName}</small>
      );
    } else {
      return null;
    }
  }

  const goToMarker = (clickedMarker: IPost) => {
    setViewport({
      ...viewport,
      longitude: clickedMarker.lng,
      latitude: clickedMarker.lat,
      zoom: 10,
      transitionDuration: 800,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
    });
  };

  return (
    <div id="mapContainer">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/howakyl/ckjf4skamegso19lhg8mm027h"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        onMouseMove={(e) => {
          document.getElementById("info")!.innerHTML = JSON.stringify(e.lngLat);
        }}
      >
        {props.posts.map((post, index) => (
          <Marker key={index} latitude={post.lat} longitude={post.lng}>
            <button
              className="markerBtn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPost(post);
                goToMarker(post);
              }}
            >
              <img src="/fish-marker.png" alt="fish marker" />
            </button>
          </Marker>
        ))}

        <pre id="info"></pre>
        {selectedPost ? (
          <Popup
            latitude={selectedPost.lat}
            longitude={selectedPost.lng}
            onClose={() => {
              setSelectedPost(undefined);
            }}
            closeOnClick={false}
            offsetLeft={30}
          >
            <div className="markerPopup">
              <img
                src={selectedPost.image}
                className="popupPost-img"
                alt={selectedPost.fish}
              />

              <section className="markerPopup-info">
                <h5>
                  <strong>{selectedPost.title}</strong>
                </h5>
                <p className="popupPost-user">
                  <em>Posted By: {selectedPost.user.username}</em>
                </p>
                {displayCatchLocation()}
                <Link
                  className="btn btn-primary popupBtn"
                  to={`/posts/${selectedPost._id}`}
                >
                  Read More
                </Link>
              </section>
            </div>
          </Popup>
        ) : null}
      </ReactMapGl>
    </div>
  );
};

export default FishMap;
