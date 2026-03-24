import { NextResponse } from "next/server";
import { DEMO_AIRPORTS, DEMO_ROUTES, demoMetadata } from "@/lib/demo-data";

export async function GET() {
  const airports = DEMO_AIRPORTS.map((a) => ({
    iata: a.iata,
    airport_name: a.airport_name,
    lat: a.lat,
    lon: a.lon,
  }));

  const routes = DEMO_ROUTES.map((r) => ({
    origin: r.origin,
    destination: r.destination,
    dominant_carrier: r.dominant_carrier,
    score: r.score,
  }));

  return NextResponse.json({
    airports,
    routes,
    metadata: demoMetadata("Geospatial network derived from current demo route data."),
  });
}
