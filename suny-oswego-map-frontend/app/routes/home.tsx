import MapSunyOswego from "~/map/map";
import type { Route } from "./+types/home";
import SearchBar from "~/components/SearchBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <SearchBar />
      <MapSunyOswego />
    </div>
  );
}
