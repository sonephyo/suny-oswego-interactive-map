import Map, { Layer, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect } from "react";
import { useMapContext } from "~/context/map-context";

export default function MapSunyOswego() {
  const [viewState, setViewState] = React.useState({
    longitude: -76.54896,
    latitude: 43.45191,
    zoom: 14.5,
  });
  const { filteredFeatures } = useMapContext();

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={`https://api.maptiler.com/maps/streets-v4/style.json?key=${import.meta.env.VITE_MAPLIBRE_KEY}`}
    >
      <Source
        id="suny-oswego-data"
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: filteredFeatures,
        }}
      >
        <Layer
          id="campus-points"
          type="circle"
          paint={{
            "circle-radius": 8,
            "circle-color": "#245c38",
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": 2,
          }}
        />
      </Source>
    </Map>
  );
}
