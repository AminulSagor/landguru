"use client";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Shield, CheckCircle, RotateCcw, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityType = "policy" | "approved" | "reset" | "config";

type Activity = {
  title: string;
  message: React.ReactNode;
  time: string;
  type: ActivityType;
};

const activities: Activity[] = [
  {
    title: "Zone Policy Updated",
    message: (
      <>
        Admin <span className="font-semibold text-primary">Rahim Ahmed</span>{" "}
        modified land restrictions for Dhaka North.
      </>
    ),
    time: "2M AGO",
    type: "policy",
  },
  {
    title: "Post Approved",
    message: (
      <>
        Admin <span className="font-semibold text-primary">Selim Khan</span>{" "}
        approved 12 bulk posts in Dhaka South.
      </>
    ),
    time: "15M AGO",
    type: "approved",
  },
  {
    title: "Password Reset",
    message: (
      <>
        Agent <span className="font-semibold text-primary">Kamal Hossain</span>{" "}
        requested a password reset for Admin Dashboard.
      </>
    ),
    time: "42M AGO",
    type: "reset",
  },
  {
    title: "System Config",
    message: (
      <>
        Super Admin changed global tax rate configuration for all active zones.
      </>
    ),
    time: "1H AGO",
    type: "config",
  },
];

const iconMap: Record<ActivityType, { icon: any; cls: string }> = {
  policy: {
    icon: Shield,
    cls: "bg-blue/10 text-blue",
  },
  approved: {
    icon: CheckCircle,
    cls: "bg-green/10 text-green",
  },
  reset: {
    icon: RotateCcw,
    cls: "bg-red/10 text-red",
  },
  config: {
    icon: Settings,
    cls: "bg-pumpkin/10 text-pumpkin",
  },
};

export default function SuperAdminRecentActivity() {
  return (
    <div className="space-y-4">
      {/* header */}
      <h3 className="text-base">
        Recent Admin Activity
      </h3>

      {/* list */}
      <div className="space-y-3">
        {activities.map((a, i) => {
          const Icon = iconMap[a.type].icon;
          return (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-gray/15 bg-white p-4"
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  iconMap[a.type].cls,
                )}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{a.title}</p>
                  <span className="text-xs font-semibold text-gray/40">
                    {a.time}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray/60 leading-relaxed">
                  {a.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <Button
        variant="secondary"
        className="w-full border border-dashed border-gray text-sm"
      >
        View Activity History
      </Button>
    </div>
  );
}
