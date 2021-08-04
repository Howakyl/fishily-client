import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker, ViewportProps } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "./NewPostMap.css";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface Props {
  onGetCoordinates: (coordinates: ICoordinates) => void;
}

interface ICoordinates {
  longitude: number | string;
  latitude: number | string;
}

const NewPostMap: React.FC<Props> = (props) => {
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 9,
    // @ts-ignore
    width: "100%",
    // @ts-ignore
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
            coordinates!.style.display = "block";
            coordinates!.innerHTML =
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
