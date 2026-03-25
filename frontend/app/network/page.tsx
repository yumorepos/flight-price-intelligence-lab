"use client";

import { useEffect, useMemo, useState } from "react";

import { AirlineIdentity } from "@/components/AirlineIdentity";
import { MetadataNotice } from "@/components/MetadataNotice";
import { NetworkGeoResponse, getNetworkGeo } from "@/lib/api";

const WIDTH = 980;
const HEIGHT = 480;

function project(lon: number, lat: number) {
  const x = ((lon + 130) / 70) * WIDTH;
  const y = HEIGHT - ((lat - 24) / 26) * HEIGHT;
  return { x, y };
}

function routeCurve(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.hypot(dx, dy);
  const curveLift = Math.min(70, distance * 0.15);
  const cx = x1 + dx / 2;
  const cy = y1 + dy / 2 - curveLift;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export default function NetworkPage() {
  const [data, setData] = useState<NetworkGeoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAirport, setSelectedAirport] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        const response = await getNetworkGeo();
        setData(response);
        if (response.airports.length > 0) {
          setSelectedAirport(response.airports[0].iata);
        }
      } catch (e) {
        setData(null);
        setError(e instanceof Error ? e.message : "Failed to load route network.");
      }
    };
    void load();
  }, []);

  const airportPoints = useMemo(() => {
    if (!data) return new Map<string, { x: number; y: number; airport_name: string }>();
    return new Map(data.airports.map((a) => [a.iata, { ...project(a.lon, a.lat), airport_name: a.airport_name }]));
  }, [data]);

  const activityByAirport = useMemo(() => {
    const activity = new Map<string, number>();
    data?.routes.forEach((route) => {
      activity.set(route.origin, (activity.get(route.origin) ?? 0) + 1);
      activity.set(route.destination, (activity.get(route.destination) ?? 0) + 1);
    });
    return activity;
  }, [data]);

  const selectedRoutes = useMemo(() => {
    if (!data || !selectedAirport) return [];
    return data.routes.filter((route) => route.origin === selectedAirport || route.destination === selectedAirport);
  }, [data, selectedAirport]);

  const topCarriers = useMemo(() => {
    if (!data) return [];
    const counts = new Map<string, number>();
    data.routes.forEach((route) => {
      counts.set(route.dominant_carrier, (counts.get(route.dominant_carrier) ?? 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [data]);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Route Network</p>
        <h1>Network map explorer</h1>
        <p>Demo route graph with airport nodes + route edges. Visual cues are for exploration, not operational network truth.</p>
      </section>
      <section className="panel">
        <p className="status">
          Demo-only surface: this module currently uses frontend mock API routes, not backend intelligence endpoints.
        </p>
      </section>

      {error ? <p className="status error">Network error: {error}</p> : null}

      {data ? (
        <>
          <MetadataNotice metadata={data.metadata} />

          <section className="panel">
            <div className="panel-header">
              <h2>U.S. network snapshot</h2>
              <p className="muted">Curved edges show route links. Node size scales with connected routes in the demo dataset.</p>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {data.airports.map((airport) => (
                <button
                  key={airport.iata}
                  type="button"
                  className={`airport-button ${selectedAirport === airport.iata ? "selected" : ""}`}
                  onClick={() => setSelectedAirport(airport.iata)}
                >
                  {airport.iata}
                </button>
              ))}
            </div>

            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full rounded-xl border border-orange-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-white">
              <defs>
                <linearGradient id="routeStroke" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>

              {data.routes.map((route) => {
                const from = airportPoints.get(route.origin);
                const to = airportPoints.get(route.destination);
                if (!from || !to) return null;

                const isSelected = selectedAirport === route.origin || selectedAirport === route.destination;
                return (
                  <path
                    key={`${route.origin}-${route.destination}`}
                    d={routeCurve(from.x, from.y, to.x, to.y)}
                    fill="none"
                    stroke="url(#routeStroke)"
                    strokeOpacity={isSelected ? 0.95 : 0.18}
                    strokeWidth={isSelected ? 2 + route.score / 70 : 0.9 + route.score / 120}
                  />
                );
              })}

              {data.airports.map((airport) => {
                const p = project(airport.lon, airport.lat);
                const activity = activityByAirport.get(airport.iata) ?? 1;
                const isSelected = selectedAirport === airport.iata;
                return (
                  <g key={airport.iata}>
                    <circle cx={p.x} cy={p.y} r={Math.min(14, 4 + activity)} fill={isSelected ? "#b91c1c" : "#c2410c"} opacity={0.85} />
                    <circle cx={p.x} cy={p.y} r={Math.min(16, 5 + activity)} fill="none" stroke={isSelected ? "#7f1d1d" : "#ea580c"} strokeOpacity={0.55} />
                    <text x={p.x + 10} y={p.y - 8} fontSize="12" fill="#374151" fontWeight="700">
                      {airport.iata}
                    </text>
                  </g>
                );
              })}
            </svg>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>{selectedAirport || "Selected"} connections</h2>
              <p className="muted">Dominant carrier + score shown per edge from currently available demo route rows.</p>
            </div>
            <div className="route-grid mt-0">
              {selectedRoutes.map((route) => (
                <article key={`${route.origin}-${route.destination}`} className="route-card">
                  <h3>{route.origin} → {route.destination}</h3>
                  <p>Route score: {route.score}</p>
                  <AirlineIdentity carrierCode={route.dominant_carrier} compact />
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <h2>Top carriers in this demo snapshot</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {topCarriers.map(([carrier, count]) => (
                <div key={carrier} className="chip bg-white">
                  <AirlineIdentity carrierCode={carrier} compact />
                  <span className="ml-2 text-xs text-gray-600">{count} routes</span>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
