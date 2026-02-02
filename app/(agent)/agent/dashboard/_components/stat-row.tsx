"use client";

import StatCard from "@/app/(agent)/agent/dashboard/_components/stat-card";
import { StatItem } from "@/app/(agent)/agent/dummy-data/moc-agent-home";

export default function StatsRow({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {stats.map((s, idx) => (
        <StatCard key={idx} item={s} />
      ))}
    </div>
  );
}
