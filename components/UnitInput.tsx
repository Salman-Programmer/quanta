"use client";

interface UnitInputProps {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

export function UnitInput({ label, unit, value, onChange, id }: UnitInputProps) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text-secondary transition-colors group-focus-within:text-accent"
      >
        {label}
        <span className="ml-1.5 text-text-muted">({unit})</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3.5 pr-14 text-lg font-medium text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted">
          {unit}
        </span>
      </div>
    </div>
  );
}
