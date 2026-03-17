"use client";

import { FormEvent } from "react";
import { Airport } from "@/lib/api";
import { formatLocation } from "@/lib/format";
import { Search, Plane } from "lucide-react";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  airports: Airport[];
  selectedOrigin: string;
  onSelectOrigin: (iata: string) => void;
  onSearch: () => void;
  isSearching: boolean;
};

export function AirportSearchPanel({
  query,
  onQueryChange,
  airports,
  selectedOrigin,
  onSelectOrigin,
  onSearch,
  isSearching,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <section className="search-panel mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Plane className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Select Origin Airport</h2>
      </div>
      <p className="muted mb-6">Search by IATA code, city name, or airport. Then select an airport to explore routes.</p>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Try JFK, SFO, LAX, or Dallas..."
            aria-label="Search airports"
            className="search-input pl-12"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSearching || query.trim().length < 1}
          className="search-button whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      {airports.length > 0 && (
        <div className="airport-grid fade-in">
          {airports.map((airport) => (
            <button
              key={airport.iata}
              className={`airport-button ${selectedOrigin === airport.iata ? "selected" : ""}`}
              type="button"
              onClick={() => onSelectOrigin(airport.iata)}
            >
              <div className="text-2xl font-bold text-blue-600 mb-1">{airport.iata}</div>
              <div className="text-sm font-semibold text-gray-900 truncate">{airport.airport_name}</div>
              <div className="text-xs text-gray-500 mt-1">{formatLocation(airport.city, airport.state, airport.country)}</div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
