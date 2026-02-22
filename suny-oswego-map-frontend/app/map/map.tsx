import Map, { Layer, Popup, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useRef } from "react";
import { useMapContext } from "~/context/map-context";
import type { MapMouseEvent, MapRef } from "react-map-gl/maplibre";

type SelectedFeature = {
  longitude: number;
  latitude: number;
  name: string;
  address: string;
  category_tags: string[];
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
      category_tags:
        typeof props?.category_tags === "string"
          ? JSON.parse(props.category_tags)
          : (props?.category_tags ?? []),
    });
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
          closeButton={false}
          maxWidth="280px"
          className="campus-popup"
        >
          <div className="min-w-50">
            <div className="bg-[#245c38] px-4 py-3 flex items-center justify-between gap-3">
              <p className="text-white font-semibold text-sm leading-snug">
                {selected.name}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="shrink-0 text-white/70 hover:text-white hover:bg-white/20 rounded p-0.5 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-3 space-y-2 bg-white"> 
              <div className="flex flex-wrap gap-1">
                {selected.category_tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
