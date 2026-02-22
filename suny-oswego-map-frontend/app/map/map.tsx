import Map, { Layer, Popup, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useRef } from "react";
import { useMapContext } from "~/context/map-context";
import type { MapMouseEvent, MapRef } from "react-map-gl/maplibre";

type SelectedFeature = {
  longitude: number;
  latitude: number;
  name: string;
  address: string;
};

export default function MapSunyOswego() {
  const [viewState, setViewState] = React.useState({
    longitude: -76.54896,
    latitude: 43.45191,
    zoom: 14.5,
  });
  const [selected, setSelected] = React.useState<SelectedFeature | null>(null);
  const mapRef = useRef<MapRef>(null);
  const { filteredFeatures } = useMapContext();

  const handleClick = (evt: MapMouseEvent) => {
    const features = evt.features;
    if (!features || features.length === 0) {
      setSelected(null);
      return;
    }

    const feature = features[0];
    const props = feature.properties;
    const coords = (feature.geometry as GeoJSON.Point).coordinates;

    mapRef.current?.flyTo({
      center: [coords[0], coords[1]],
      duration: 800,
    });

    setSelected({
      longitude: coords[0],
      latitude: coords[1],
      name: props?.name ?? "Unknown",
      address:
        `${props?.["addr:housenumber"] ?? ""} ${props?.["addr:street"] ?? ""}`.trim(),
    });
  };

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={`https://api.maptiler.com/maps/streets-v4/style.json?key=${import.meta.env.VITE_MAPLIBRE_KEY}`}
      interactiveLayerIds={["campus-points"]}
      onClick={handleClick}
      cursor="pointer"
    >
      <Source
        id="suny-oswego-data"
        type="geojson"
        data={{ type: "FeatureCollection", features: filteredFeatures }}
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

      {selected && (
        <Popup
          longitude={selected.longitude}
          latitude={selected.latitude}
          anchor="bottom"
          onClose={() => setSelected(null)}
          closeOnClick={false}
        >
          <div style={{ padding: "8px", minWidth: "150px" }}>
            <strong>{selected.name}</strong>
            {selected.address && (
              <p style={{ margin: "4px 0 0" }}>{selected.address}</p>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
