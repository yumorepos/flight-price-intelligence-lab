"use client";

import { useEffect, useMemo, useState } from "react";

import { MetadataNotice } from "@/components/MetadataNotice";
import { RouteCompetitionResponse, getRouteCompetition } from "@/lib/api";
import { formatMonth, formatPercent } from "@/lib/format";

export default function CompetitionIntelligencePage() {
  const [data, setData] = useState<RouteCompetitionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setData(await getRouteCompetition({ limit: 40 }));
      } catch (e) {
        setData(null);
        setError(e instanceof Error ? e.message : "Failed to load competition intelligence.");
      }
    };

    void load();
  }, []);

  const summary = useMemo(() => {
    if (!data?.rows.length) return null;
    const highlyContested = data.rows.filter((row) => row.active_carriers >= 3).length;
    const dominated = data.rows.filter((row) => row.dominant_carrier_share >= 0.7).length;
    return {
      total: data.rows.length,
      highlyContested,
      dominated,
      period: formatMonth(data.rows[0].year, data.rows[0].month),
    };
  }, [data]);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Competition intelligence</p>
        <h1>Route competition visual scan</h1>
        <p>Fast read of carrier pressure, concentration, and contested corridors from backend-supported route metrics.</p>
      </section>

      {error ? <p className="status error">Competition intelligence error: {error}</p> : null}

      {data ? (
        <>
          <MetadataNotice metadata={data.metadata} />

          {summary ? (
            <section className="panel">
              <h2>Snapshot summary</h2>
              <div className="stats-grid">
                <article className="stat-card">
                  <p className="stat-label">Routes analyzed</p>
                  <p className="stat-value">{summary.total}</p>
                  <p className="stat-detail">{summary.period}</p>
                </article>
                <article className="stat-card">
                  <p className="stat-label">Highly contested</p>
                  <p className="stat-value">{summary.highlyContested}</p>
                  <p className="stat-detail">3+ active carriers</p>
                </article>
                <article className="stat-card">
                  <p className="stat-label">Dominated routes</p>
                  <p className="stat-value">{summary.dominated}</p>
                  <p className="stat-detail">Leader share ≥ 70%</p>
                </article>
              </div>
            </section>
          ) : null}

          <section className="panel">
            <h2>Competition board</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Competition label</th>
                    <th>Active carriers</th>
                    <th>Dominant share</th>
                    <th>Entrant pressure</th>
                    <th>Visual cue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row) => {
                    return (
                      <tr key={`${row.route_key}-${row.year}-${row.month}`}>
                        <td className="font-semibold">{row.origin_iata} → {row.destination_iata}</td>
                        <td>{row.competition_label}</td>
                        <td>{row.active_carriers}</td>
                        <td>{formatPercent(row.dominant_carrier_share)}</td>
                        <td>{row.entrant_pressure_signal}</td>
                        <td>
                          <span className={`badge ${row.active_carriers >= 3 ? "badge-success" : row.dominant_carrier_share >= 0.7 ? "badge-warning" : "badge-neutral"}`}>
                            {row.active_carriers >= 3 ? "Contested" : row.dominant_carrier_share >= 0.7 ? "Dominated" : "Balanced"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="muted mt-4">
              Visual cue badges are derived from carrier-count and concentration thresholds; no specific carrier identity is implied in this backend dataset.
            </p>
          </section>
        </>
      ) : null}
    </main>
  );
}
