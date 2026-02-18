import { useState } from "react";
import { Search } from "lucide-react";

const CHIPS = [
  "Dining",
  "Academic",
  "Residential",
  "Recreation",
  "Services",
  "Facility",
  "Parking",
  "Athletics",
];

export default function SearchBar() {
  const [active, setActive] = useState<string[]>([]);

  const toggleChip = (label: string) => {
    setActive((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label],
    );
  };
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="bg-white rounded-2xl shadow-md px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search buildings..."
            className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="h-px bg-gray-100" />
        <div className="flex gap-2 flex-wrap">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => toggleChip(chip)}
              className={`shrink-0 text-xs px-3 py-1 rounded-full border transition-colors ${
                active.includes(chip)
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
