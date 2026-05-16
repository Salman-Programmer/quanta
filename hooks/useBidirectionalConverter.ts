"use client";

import { useCallback, useMemo, useState } from "react";
import { formatNumber, parseInput } from "@/lib/conversions";

export function useBidirectionalConverter<T extends string>(
  units: readonly T[],
  toBase: (value: number, unit: T) => number,
  fromBase: (base: number, unit: T) => number,
) {
  const emptyValues = useMemo(
    () => Object.fromEntries(units.map((u) => [u, ""])) as Record<T, string>,
    [units],
  );

  const [values, setValues] = useState<Record<T, string>>(emptyValues);

  const handleChange = useCallback(
    (unit: T, raw: string) => {
      if (raw.trim() === "") {
        setValues({ ...emptyValues });
        return;
      }

      const parsed = parseInput(raw);
      if (parsed === null) {
        setValues((prev) => ({ ...prev, [unit]: raw }));
        return;
      }

      const base = toBase(parsed, unit);
      const updated = {} as Record<T, string>;
      for (const u of units) {
        updated[u] = u === unit ? raw : formatNumber(fromBase(base, u));
      }
      setValues(updated);
    },
    [units, toBase, fromBase, emptyValues],
  );

  return { values, handleChange };
}
