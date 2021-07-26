import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "./NewPostMap.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const NewPostMap = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 9,
    width: "100%",
    height: "60vh",
  });

  const [markerPostion, setMarkerPosition] = useState({
    latitude: 47.6062,
    longitude: -122.3821,
  });
  
  useEffect (() => {
    const timer = setTimeout(() => {
      props.onGetCoordinates(markerPostion)
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [markerPostion, props])

  const coordinates = document.getElementById("coordinates");

  return (
    <div className="newPostMapContainer">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/howakyl/ckjf4skamegso19lhg8mm027h"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          draggable={true}
          latitude={markerPostion.latitude}
          longitude={markerPostion.longitude}
          onDrag={(e) => {
            setMarkerPosition({
              longitude: e.lngLat[0],
              latitude: e.lngLat[1],
            });
          }}
          onDragEnd={(e) => {
            setMarkerPosition({
              longitude: e.lngLat[0],
              latitude: e.lngLat[1],
            });
            coordinates.style.display = "block";
            coordinates.innerHTML =
              "Latitude: " +
              markerPostion.latitude +
              "<br />Longitude: " +
              markerPostion.longitude;
          }}
        >
          <div className="newPostMarker"></div>
        </Marker>

        <pre id="coordinates" className="coordinates"></pre>
      </ReactMapGl>
    </div>
  );
};

export default NewPostMap;
