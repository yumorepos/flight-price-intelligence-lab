"use client";

import { useEffect, useState } from "react";
import { MetadataNotice } from "@/components/MetadataNotice";
import { NetworkHubResponse, getNetworkHubs } from "@/lib/api";

export default function NetworkPage() {
  const [data, setData] = useState<NetworkHubResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setData(await getNetworkHubs());
      } catch (e) {
        setData(null);
        setError(e instanceof Error ? e.message : "Failed to load route network.");
      }
    };
    void load();
  }, []);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Route Network</p>
        <h1>Hub-to-route exploration</h1>
        <p>Visual-first route discovery module for aviation enthusiasts.</p>
      </section>

      {error ? <p className="status error">Network error: {error}</p> : null}

      {data ? (
        <>
          <MetadataNotice metadata={data.metadata} />
          <section className="panel">
            <h2>Major hub network snapshots</h2>
            <div className="route-grid">
              {data.hubs.map((hub) => (
                <article className="route-card" key={hub.origin}>
                  <h3>{hub.origin}</h3>
                  <p className="muted">{hub.route_count} routes in current demo graph</p>
                  <div className="chips mt-3 flex flex-wrap gap-2">
                    {hub.destinations.map((d) => (
                      <span key={`${hub.origin}-${d}`} className="badge badge-neutral">
                        {hub.origin} → {d}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
