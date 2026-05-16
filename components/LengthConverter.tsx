"use client";

import { UnitInput } from "@/components/UnitInput";
import { Card } from "@/components/Card";
import { useBidirectionalConverter } from "@/hooks/useBidirectionalConverter";
import {
  LENGTH_LABELS,
  LENGTH_UNITS,
  type LengthUnit,
  lengthToMeters,
  metersToLength,
} from "@/lib/conversions";

export function LengthConverter() {
  const { values, handleChange } = useBidirectionalConverter(
    LENGTH_UNITS,
    lengthToMeters,
    metersToLength,
  );

  return (
    <Card>
      <div className="grid gap-5 sm:grid-cols-2">
        {LENGTH_UNITS.map((unit) => (
          <UnitInput
            key={unit}
            id={`length-${unit}`}
            label={LENGTH_LABELS[unit]}
            unit={unit}
            value={values[unit]}
            onChange={(v) => handleChange(unit as LengthUnit, v)}
          />
        ))}
      </div>
    </Card>
  );
}
