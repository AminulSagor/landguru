"use client";

import {
  Banknote,
  MapPin,
  AlertTriangle,
  Users,
  TrendingUp,
} from "lucide-react";

type Stat = {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  icon: React.ReactNode;
  bg?: string;
  border?: string;
  iconBg?: string;
  valueColor?: string;
};

export default function SuperAdminStats() {
  const stats: Stat[] = [
    {
      title: "Total Revenue",
      value: "৳ 4.5 Cr",
      trend: "+15%",
      icon: <Banknote size={18} className="text-green-600" />,
      iconBg: "bg-green-50",
      valueColor: "text-gray-900",
    },
    {
      title: "Active Locations",
      value: "8 Zones",
      subtitle: "+5",
      icon: <MapPin size={18} className="text-blue-600" />,
      iconBg: "bg-blue-50",
      valueColor: "text-gray-900",
    },
    {
      title: "Critical Alerts",
      value: "5 Resets",
      subtitle: "Admin Password Requests",
      icon: <AlertTriangle size={18} className="text-red-500" />,
      bg: "bg-red-50",
      border: "border-red-200",
      iconBg: "bg-red-100",
      valueColor: "text-gray-900",
    },
    {
      title: "User Growth",
      value: "12,450",
      trend: "+120 today",
      icon: <Users size={18} className="text-indigo-600" />,
      iconBg: "bg-indigo-50",
      valueColor: "text-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`rounded-xl border p-5 ${
            s.bg ?? "bg-white"
          } ${s.border ?? "border-gray-200"}`}
        >
          {/* header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">{s.title}</p>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                s.iconBg ?? "bg-gray-100"
              }`}
            >
              {s.icon}
            </div>
          </div>

          {/* value */}
          <div className="mt-3">
            <p className={`text-2xl font-extrabold ${s.valueColor}`}>
              {s.value}
            </p>

            {s.trend && (
              <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp size={14} />
                {s.trend}
              </div>
            )}

            {s.subtitle && (
              <p className="mt-1 text-sm font-medium text-gray-500">
                {s.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
