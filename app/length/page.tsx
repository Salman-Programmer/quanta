import { Ruler } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { LengthConverter } from "@/components/LengthConverter";

export default function LengthPage() {
  return (
    <div>
      <PageHeader
        icon={Ruler}
        title="Length Converter"
        description="Edit any unit field."
      />
      <LengthConverter />
    </div>
  );
}
