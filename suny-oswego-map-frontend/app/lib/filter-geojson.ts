// app/lib/filter-geojson.ts

import type {
  FeatureCollection,
  Feature,
  GeoJsonProperties,
  Geometry,
} from "geojson";

export function filterByCategories(
  geojson: FeatureCollection,
  active: string[],
): Feature<Geometry, GeoJsonProperties>[] {
  if (active.length === 0) return geojson.features;

  return geojson.features.filter((feature) => {
    const tags: string[] =
      (feature.properties?.category_tags as string[]) ?? [];
    return tags.some((tag) => active.includes(tag.toLowerCase()));
  });
}
