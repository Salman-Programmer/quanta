import Link from "next/link";
import { ArrowRight, Ruler} from "lucide-react";
import { Card } from "@/components/Card";

const categories = [
  {
    href: "/length",
    title: "Length",
    description: "Meters, kilometers, feet, inches, and miles — synced in real time.",
    icon: Ruler,
    accent: "from-indigo-500/20 to-violet-500/10",
    iconColor: "text-indigo-400",
  },
] as const;

export default function DashboardPage() {
  return (
    <div>
   
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ href, title, description, icon: Icon, accent, iconColor }) => (
          <Link key={href} href={href} className="group block">
            <Card hover className="relative h-full overflow-hidden">
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated">
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}
