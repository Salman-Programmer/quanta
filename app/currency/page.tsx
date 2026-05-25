import { Banknote } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyConverter } from "@/components/CurrencyConverter";

export default function CurrencyPage() {
  return (
    <div>
      <PageHeader
        icon={Banknote}
        title="Currency Converter"
        description="Live exchange rates from open.er-api.com."
      />
      <CurrencyConverter />
    </div>
  );
}
