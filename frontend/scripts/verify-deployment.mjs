const FRONTEND_BASE = process.env.FRONTEND_BASE ?? "https://avgeek-intelligence-lab.vercel.app";

const pageChecks = [
  "/intelligence/airports?airport=JFK",
  "/intelligence/competition?airport=JFK",
  "/intelligence/route-changes?airport=JFK",
];

const apiChecks = [
  "/api/intelligence/routes/insights?airport_iata=JFK&limit=5",
  "/api/intelligence/airports/JFK/role",
];

async function checkPage(path) {
  const url = `${FRONTEND_BASE}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  const body = await res.text();
  const hasLocalhost = body.includes("http://localhost:8000");

  return {
    kind: "page",
    path,
    url,
    status: res.status,
    ok: res.ok && !hasLocalhost,
    detail: hasLocalhost ? "page payload still contains localhost:8000 hint" : "ok",
  };
}

async function checkApi(path) {
  const url = `${FRONTEND_BASE}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  const body = await res.text();
  const hasBackendOnly = body.includes("Backend-only endpoint");
  const hasLocalhost = body.includes("http://localhost:8000");

  return {
    kind: "api",
    path,
    url,
    status: res.status,
    ok: res.ok && !hasBackendOnly && !hasLocalhost,
    detail: hasBackendOnly
      ? "still returning Backend-only endpoint"
      : hasLocalhost
        ? "response still references localhost:8000"
        : "ok",
  };
}

async function main() {
  const results = [];
  for (const path of pageChecks) {
    results.push(await checkPage(path));
  }
  for (const path of apiChecks) {
    results.push(await checkApi(path));
  }

  console.table(
    results.map((r) => ({
      type: r.kind,
      status: r.status,
      ok: r.ok,
      path: r.path,
      detail: r.detail,
    }))
  );

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error("Verification failed for:");
    failed.forEach((f) => console.error(`- ${f.url} (${f.status}) ${f.detail}`));
    process.exit(1);
  }

  console.log("Deployment verification passed.");
}

main().catch((error) => {
  console.error("Verification script error:", error);
  process.exit(1);
});
