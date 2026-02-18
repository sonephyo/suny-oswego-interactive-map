// app/context/map-context.tsx

import { createContext, useContext, useState } from "react";
import type { FeatureCollection, Feature } from "geojson";
import { filterByCategories } from "~/lib/filter-geojson";
import geojson from "~/data/suny-oswego.json";

interface MapContextType {
  active: string[];
  toggleChip: (label: string) => void;
  filteredFeatures: Feature[];
}

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string[]>([]);

  const toggleChip = (label: string) => {
    const lower = label.toLowerCase();
    setActive((prev) =>
      prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower],
    );
  };
  
  const filteredFeatures = filterByCategories(
    geojson as FeatureCollection,
    active,
  );

  return (
    <MapContext.Provider value={{ active, toggleChip, filteredFeatures }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context)
    throw new Error("useMapContext must be used within MapProvider");
  return context;
}
