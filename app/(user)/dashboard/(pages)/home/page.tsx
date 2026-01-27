import React from "react";
import {
  CalendarDays,
  ClipboardList,
  Gift,
  MapPinPlusInside,
} from "lucide-react";
import { featuredProperties } from "@/app/(user)/dashboard/dummy-data/property";
import PropertyCard from "@/components/cards/property-card";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <h1 className="font-semibold text-2xl text-black">Welcome Back, User!</h1>
      <p className="text-gray-500 text-sm mt-1">
        Here what is happening with your properties today.
      </p>

      {/* dashboard info */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <ActionCard
            variant="blue"
            title="Sell Property"
            subtitle="List your asset today"
            icon={<Gift size={18} />}
            link="/dashboard/create-sell-post"
          />
        </div>

        <div className="lg:col-span-2">
          <ActionCard
            variant="green"
            title="Request To Buy"
            subtitle="Find your dream space"
            icon={<MapPinPlusInside size={18} />}
            link="/dashboard/create-buy-post"
          />
        </div>

        <div className="lg:col-span-1">
          <StatCard
            icon={<ClipboardList size={18} className="text-primary" />}
            label="Active Posts"
            value={12}
          />
        </div>

        <div className="lg:col-span-1">
          <StatCard
            icon={<CalendarDays size={18} className="text-red-500" />}
            label="Upcoming Meetings"
            value={5}
          />
        </div>
      </div>

      {/* Featured properties */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-black">
            Featured Properties
          </h2>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
            See All →
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 h-full">
      <div className="flex justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-700">
          {icon}
        </div>
        <span className="text-gray">›</span>
      </div>

      <div className="mt-6">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-4 text-xl font-extrabold text-black">{value}</p>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  subtitle,
  icon,
  variant,
  link,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  variant: "blue" | "green";
  link: string;
}) {
  const styles = variant === "blue" ? "bg-blue-600" : "bg-emerald-500";

  return (
    <Link href={link}>
      <div
        className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-sm ${styles}`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          {icon}
        </div>

        <div className="mt-10">
          <p className="text-lg font-extrabold">{title}</p>
          <p className="text-sm text-white/80">{subtitle}</p>
        </div>

        {/* decorative */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10" />
      </div>
    </Link>
  );
}
