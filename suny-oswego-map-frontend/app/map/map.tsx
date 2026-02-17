import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import React from "react";

export default function MapSunyOswego() {
  const [viewState, setViewState] = React.useState({
    longitude:  -76.547837,
    latitude: 43.450660,
    zoom: 15,
  });

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={`https://api.maptiler.com/maps/streets-v4/style.json?key=${import.meta.env.VITE_MAPLIBRE_KEY}`}
    />
  );
}
