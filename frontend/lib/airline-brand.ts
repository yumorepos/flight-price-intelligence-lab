export type AirlineBrand = {
  carrierCode: string;
  displayName: string;
  shortName: string;
  colorFrom: string;
  colorTo: string;
};

const BRAND_MAP: Record<string, Omit<AirlineBrand, "carrierCode">> = {
  AA: {
    displayName: "American Airlines",
    shortName: "American",
    colorFrom: "#2563eb",
    colorTo: "#dc2626",
  },
  DL: {
    displayName: "Delta Air Lines",
    shortName: "Delta",
    colorFrom: "#1d4ed8",
    colorTo: "#be123c",
  },
  UA: {
    displayName: "United Airlines",
    shortName: "United",
    colorFrom: "#0369a1",
    colorTo: "#0f172a",
  },
  B6: {
    displayName: "JetBlue Airways",
    shortName: "JetBlue",
    colorFrom: "#1e3a8a",
    colorTo: "#0891b2",
  },
  AS: {
    displayName: "Alaska Airlines",
    shortName: "Alaska",
    colorFrom: "#0f766e",
    colorTo: "#0f172a",
  },
};

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function deriveFallbackPalette(code: string): { colorFrom: string; colorTo: string } {
  const seed = normalizeCode(code)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const hue = seed % 360;
  return {
    colorFrom: `hsl(${hue}, 70%, 45%)`,
    colorTo: `hsl(${(hue + 34) % 360}, 75%, 32%)`,
  };
}

export function getAirlineBrand(carrierCode: string, airlineName?: string): AirlineBrand {
  const normalizedCode = normalizeCode(carrierCode);
  const mapped = BRAND_MAP[normalizedCode];

  if (mapped) {
    return {
      carrierCode: normalizedCode,
      displayName: airlineName ?? mapped.displayName,
      shortName: mapped.shortName,
      colorFrom: mapped.colorFrom,
      colorTo: mapped.colorTo,
    };
  }

  const fallbackPalette = deriveFallbackPalette(normalizedCode);
  return {
    carrierCode: normalizedCode,
    displayName: airlineName ?? normalizedCode,
    shortName: normalizedCode,
    colorFrom: fallbackPalette.colorFrom,
    colorTo: fallbackPalette.colorTo,
  };
}

export function getCarrierMonogram(code: string): string {
  const normalized = normalizeCode(code);
  if (normalized.length <= 2) return normalized;
  return normalized.slice(0, 2);
}
