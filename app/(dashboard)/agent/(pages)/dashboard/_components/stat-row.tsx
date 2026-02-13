"use client";

import StatCard from "@/app/(dashboard)/agent/(pages)/dashboard/_components/stat-card";
import { StatItem } from "@/app/(dashboard)/agent/dummy-data/moc-agent-home";

export default function StatsRow({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {stats.map((s, idx) => (
        <StatCard key={idx} item={s} />
      ))}
    </div>
  );
}
