const DEFAULT_PRODUCTION_BACKEND = "https://avgeek-intelligence-lab.onrender.com";
const DEFAULT_LOCAL_BACKEND = "http://localhost:8000";

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export function resolveApiBaseUrl(params: {
  envValue: string | undefined;
  nodeEnv: string | undefined;
  useBackendProxy: string | undefined;
}): string {
  const { envValue, nodeEnv, useBackendProxy } = params;

  if (useBackendProxy === "true") {
    return "/api";
  }

  if (envValue && envValue.trim().length > 0) {
    return normalizeBaseUrl(envValue.trim());
  }

  if (nodeEnv === "development") {
    return DEFAULT_LOCAL_BACKEND;
  }

  return DEFAULT_PRODUCTION_BACKEND;
}

export function getDefaultBackendHint(params: {
  nodeEnv: string | undefined;
  useBackendProxy: string | undefined;
}): string {
  const { nodeEnv, useBackendProxy } = params;

  if (useBackendProxy === "true") {
    return `/api (proxied to ${DEFAULT_PRODUCTION_BACKEND})`;
  }

  return nodeEnv === "development" ? DEFAULT_LOCAL_BACKEND : DEFAULT_PRODUCTION_BACKEND;
}
