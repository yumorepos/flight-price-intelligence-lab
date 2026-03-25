import { searchAirports } from "@/lib/api";

const FALLBACK_AIRPORTS = ["ATL", "LAX", "DFW", "SFO", "JFK"];

export async function resolveAirportDefaults(limit = 5): Promise<{ defaultAirport: string; airports: string[] }> {
  try {
    const response = await searchAirports("");
    const discovered = response.results.map((airport) => airport.iata.toUpperCase());
    const unique = Array.from(new Set(discovered));

    if (unique.length > 0) {
      const safeDefault = FALLBACK_AIRPORTS.find((iata) => unique.includes(iata)) ?? unique[0];
      return {
        defaultAirport: safeDefault,
        airports: unique.slice(0, limit),
      };
    }
  } catch {
    // Keep deterministic fallback defaults when search endpoint is unavailable.
  }

  return {
    defaultAirport: FALLBACK_AIRPORTS[0],
    airports: FALLBACK_AIRPORTS.slice(0, limit),
  };
}
