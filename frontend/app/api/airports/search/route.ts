import { NextRequest, NextResponse } from "next/server";
import { DEMO_AIRPORTS } from "@/lib/demo-data";

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
    metadata: {
      data_source: "mock_demo_data",
      is_fallback: true,
      data_complete: false,
      note: "Using mock data for demo. Backend not deployed yet.",
    },
  });
}
