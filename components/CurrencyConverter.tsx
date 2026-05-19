"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { Select } from "@/components/Select";
import { parseInput, formatNumber } from "@/lib/conversions";

const API_URL = "https://open.er-api.com/v6/latest/USD";
const STORAGE_KEY = "currency-converter-pair";

const POPULAR_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "INR",
  "MXN",
  "BRL",
  "KRW",
  "SGD",
  "HKD",
  "NZD",
  "SEK",
  "NOK",
  "DKK",
  "ZAR",
  "AED",
] as const;

interface RatesResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
}

function loadSavedPair(): { from: string; to: string } {
  if (typeof window === "undefined") return { from: "USD", to: "EUR" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { from: "USD", to: "EUR" };
    const parsed = JSON.parse(raw) as { from?: string; to?: string };
    return {
      from: parsed.from ?? "USD",
      to: parsed.to ?? "EUR",
    };
  } catch {
    return { from: "USD", to: "EUR" };
  }
}

export function CurrencyConverter() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [hydrated, setHydrated] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: RatesResponse = await res.json();
      if (data.result !== "success" || !data.rates) {
        throw new Error("Invalid response from exchange rate API");
      }
      setRates(data.rates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load exchange rates");
      setRates(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = loadSavedPair();
    setFrom(saved.from);
    setTo(saved.to);
    setHydrated(true);
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ from, to }));
  }, [from, to, hydrated]);

  const currencyOptions = useMemo(() => {
    const codes = rates
      ? [...new Set([...POPULAR_CURRENCIES, ...Object.keys(rates)])].sort()
      : [...POPULAR_CURRENCIES];
    return codes.map((code) => ({
      value: code,
      label: code,
    }));
  }, [rates]);

  const converted = useMemo(() => {
    if (!rates) return "";
    const parsed = parseInput(amount);
    if (parsed === null) return "";
    const fromRate = rates[from];
    const toRate = rates[to];
    if (!fromRate || !toRate) return "";
    const result = (parsed / fromRate) * toRate;
    return formatNumber(result);
  }, [amount, from, to, rates]);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Card className="max-w-2xl">
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Unable to load rates</p>
            <p className="mt-1 text-red-300/80">{error}</p>
            <button
              type="button"
              onClick={fetchRates}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-500/30"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label
            htmlFor="currency-amount"
            className="mb-2 block text-sm font-medium text-text-secondary"
          >
            Amount
          </label>
          <input
            id="currency-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-4 text-3xl font-bold text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <Select
            id="currency-from"
            label="From"
            value={from}
            options={currencyOptions}
            onChange={setFrom}
          />

          <button
            type="button"
            onClick={swapCurrencies}
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-elevated text-text-secondary transition-all hover:border-accent hover:bg-accent-muted hover:text-accent sm:mb-0.5"
            aria-label="Swap currencies"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>

          <Select
            id="currency-to"
            label="To"
            value={to}
            options={currencyOptions}
            onChange={setTo}
          />
        </div>

        <div className="rounded-xl border border-border bg-surface-elevated p-6">
          <p className="mb-1 text-sm font-medium text-text-muted">Converted amount</p>
          {loading ? (
            <div className="flex items-center gap-3 text-text-secondary">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
              <span className="text-lg">Loading rates…</span>
            </div>
          ) : (
            <p className="text-3xl font-bold tracking-tight text-text-primary">
              {converted !== "" ? (
                <>
                  {converted}{" "}
                  <span className="text-xl font-semibold text-text-muted">{to}</span>
                </>
              ) : (
                <span className="text-text-muted">—</span>
              )}
            </p>
          )}
          {rates && !loading && (
            <p className="mt-3 text-xs text-text-muted">
              1 {from} = {formatNumber((rates[to] ?? 0) / (rates[from] ?? 1))} {to}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
