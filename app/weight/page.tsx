import { Scale } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { WeightConverter } from "@/components/WeightConverter";

export default function WeightPage() {
  return (
    <div>
      <PageHeader
        icon={Scale}
        title="Weight Converter"
        description="Convert between kilograms, grams, pounds, and ounces."
      />
      <WeightConverter />
    </div>
  );
}
