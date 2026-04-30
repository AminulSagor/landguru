export type LandUnit = "Katha" | "Decimal" | "Bigha" | "Sqft";

// Common BD approximations; adjust if backend uses region-specific values.
const UNIT_TO_SQFT: Record<LandUnit, number> = {
  Katha: 720,
  Decimal: 435.6,
  Bigha: 14400,
  Sqft: 1,
};

export function normalizeLandUnit(unit?: string | null): LandUnit | null {
  if (!unit) return null;

  const normalized = unit.trim().toLowerCase().replace(/\s+/g, " ");

  if (normalized === "katha") return "Katha";
  if (normalized === "decimal") return "Decimal";
  if (normalized === "bigha") return "Bigha";

  if (
    normalized === "sqft" ||
    normalized === "sq.ft" ||
    normalized === "sq ft" ||
    normalized === "square feet" ||
    normalized === "square foot"
  ) {
    return "Sqft";
  }

  return null;
}

export function convertLandAmount(
  value: number | null | undefined,
  fromUnit?: string | null,
  toUnit?: string | null,
): number | null {
  if (value === null || value === undefined) return null;
  if (!Number.isFinite(value)) return null;

  const from = normalizeLandUnit(fromUnit);
  const to = normalizeLandUnit(toUnit);

  if (!from || !to || from === to) {
    return value;
  }

  return (value * UNIT_TO_SQFT[from]) / UNIT_TO_SQFT[to];
}

export function convertPricePerUnit(
  pricePerUnit: number | null | undefined,
  fromUnit?: string | null,
  toUnit?: string | null,
): number | null {
  if (pricePerUnit === null || pricePerUnit === undefined) return null;
  if (!Number.isFinite(pricePerUnit)) return null;

  const from = normalizeLandUnit(fromUnit);
  const to = normalizeLandUnit(toUnit);

  if (!from || !to) return null;
  if (from === to) return pricePerUnit;

  return (pricePerUnit / UNIT_TO_SQFT[from]) * UNIT_TO_SQFT[to];
}
