import { NextRequest, NextResponse } from 'next/server';

// Mock airport data for demo
const MOCK_AIRPORTS = [
  { iata: "JFK", airport_name: "John F Kennedy Intl", city: "New York", state: "NY", country: "USA" },
  { iata: "LAX", airport_name: "Los Angeles Intl", city: "Los Angeles", state: "CA", country: "USA" },
  { iata: "ORD", airport_name: "Chicago O'Hare Intl", city: "Chicago", state: "IL", country: "USA" },
  { iata: "DFW", airport_name: "Dallas Fort Worth Intl", city: "Dallas", state: "TX", country: "USA" },
  { iata: "ATL", airport_name: "Hartsfield Jackson Atlanta Intl", city: "Atlanta", state: "GA", country: "USA" },
  { iata: "SFO", airport_name: "San Francisco Intl", city: "San Francisco", state: "CA", country: "USA" },
  { iata: "LGA", airport_name: "LaGuardia", city: "New York", state: "NY", country: "USA" },
  { iata: "EWR", airport_name: "Newark Liberty Intl", city: "Newark", state: "NJ", country: "USA" },
  { iata: "MIA", airport_name: "Miami Intl", city: "Miami", state: "FL", country: "USA" },
  { iata: "SEA", airport_name: "Seattle Tacoma Intl", city: "Seattle", state: "WA", country: "USA" },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  const results = MOCK_AIRPORTS.filter(airport =>
    airport.iata.toLowerCase().includes(query.toLowerCase()) ||
    airport.airport_name.toLowerCase().includes(query.toLowerCase()) ||
    (airport.city && airport.city.toLowerCase().includes(query.toLowerCase()))
  );

  return NextResponse.json({
    query,
    results,
    metadata: {
      data_source: "mock_demo_data",
      is_fallback: true,
      data_complete: false,
      note: "Using mock data for demo. Backend not deployed yet."
    }
  });
}
