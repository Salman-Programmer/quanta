export const LENGTH_UNITS = ["m", "km", "ft", "in", "mi"] as const;
export type LengthUnit = (typeof LENGTH_UNITS)[number];

export const LENGTH_LABELS: Record<LengthUnit, string> = {
  m: "Meters",
  km: "Kilometers",
  ft: "Feet",
  in: "Inches",
  mi: "Miles",
};

const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  m: 1,
  km: 1000,
  ft: 0.3048,
  in: 0.0254,
  mi: 1609.344,
};

export function lengthToMeters(value: number, unit: LengthUnit): number {
  return value * LENGTH_TO_METERS[unit];
}

export function metersToLength(meters: number, unit: LengthUnit): number {
  return meters / LENGTH_TO_METERS[unit];
}



export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e9 || (abs > 0 && abs < 1e-6)) {
    return value.toExponential(6).replace(/\.?0+e/, "e");
  }
  const decimals = abs >= 1000 ? 2 : abs >= 1 ? 4 : 8;
  const rounded = Number(value.toFixed(decimals));
  return String(rounded);
}

export function parseInput(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "" || trimmed === "-" || trimmed === ".") return null;
  const parsed = parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}
