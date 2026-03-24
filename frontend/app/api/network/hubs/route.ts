import { NextResponse } from "next/server";
import { DEMO_ROUTES } from "@/lib/demo-data";

export async function GET() {
  const byHub = DEMO_ROUTES.reduce<Record<string, string[]>>((acc, route) => {
    if (!acc[route.origin]) acc[route.origin] = [];
    acc[route.origin].push(route.destination);
    return acc;
  }, {});

  const hubs = Object.entries(byHub).map(([origin, destinations]) => ({
    origin,
    destinations: Array.from(new Set(destinations)).sort(),
    route_count: Array.from(new Set(destinations)).length,
  }));

  return NextResponse.json({
    hubs,
    metadata: {
      data_source: "mock_demo_data",
      is_fallback: true,
      data_complete: false,
      note: "Network hub view derived from demo route graph.",
    },
  });
}
