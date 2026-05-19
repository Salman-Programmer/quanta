"use client";

import { UnitInput } from "@/components/UnitInput";
import { Card } from "@/components/Card";
import { useBidirectionalConverter } from "@/hooks/useBidirectionalConverter";
import {
  WEIGHT_LABELS,
  WEIGHT_UNITS,
  type WeightUnit,
  weightToKg,
  kgToWeight,
} from "@/lib/conversions";

export function WeightConverter() {
  const { values, handleChange } = useBidirectionalConverter(
    WEIGHT_UNITS,
    weightToKg,
    kgToWeight,
  );

  return (
    <Card>
      <div className="grid gap-5 sm:grid-cols-2">
        {WEIGHT_UNITS.map((unit) => (
          <UnitInput
            key={unit}
            id={`weight-${unit}`}
            label={WEIGHT_LABELS[unit]}
            unit={unit}
            value={values[unit]}
            onChange={(v) => handleChange(unit as WeightUnit, v)}
          />
        ))}
      </div>
    </Card>
  );
}
