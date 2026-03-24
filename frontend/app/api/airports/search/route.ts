import { NextRequest, NextResponse } from "next/server";
import { DEMO_AIRPORTS, demoMetadata } from "@/lib/demo-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = (searchParams.get("q") || "").toLowerCase();

  const results = DEMO_AIRPORTS.filter(
    (airport) =>
      airport.iata.toLowerCase().includes(query) ||
      airport.airport_name.toLowerCase().includes(query) ||
      airport.city.toLowerCase().includes(query),
  ).map(({ enplanements: _e, ...airport }) => airport);

  return NextResponse.json({
    query,
    results,
    metadata: demoMetadata("Using mock data for demo. Backend not deployed yet."),
  });
}
