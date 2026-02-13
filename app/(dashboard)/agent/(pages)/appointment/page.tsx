"use client";
import { Tab, TabConfig } from "@/components/tabs/tab";
import { useState } from "react";

import Card from "@/components/cards/card";
import { ChevronRight, User } from "lucide-react";
import {
  AppointmentItem,
  appointmentsData,
} from "@/app/(dashboard)/agent/dummy-data/moc-appointment-data";

type Tabkey = "upcomming" | "past";
const AppointmentPage = () => {
  const [tabKey, setTabkey] = useState<Tabkey>("upcomming");
  const tabs: TabConfig<Tabkey>[] = [
    { key: "upcomming", label: "UpComming" },
    { key: "past", label: "Past" },
  ];

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      <Tab tabs={tabs} tabKey={tabKey} onChangeTabKey={setTabkey} />
      <div className="space-y-4">
        {appointmentsData.map((item, index) => (
          <AppointmentListCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;

{
  /* appointment list card */
}

function AppointmentListCard({ item }: { item: AppointmentItem }) {
  return (
    <Card className="rounded-2xl p-5 flex gap-5 items-start">
      {/* date box */}
      <div className="flex h-38 w-38 flex-col items-center justify-center rounded-xl bg-secondary text-primary font-extrabold">
        <span className="text-sm">{item.date.month}</span>
        <span className="text-2xl">{item.date.day}</span>
      </div>

      {/* content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-gray">{item.title}</h3>
            <p className="text-xs font-semibold text-gray/50">{item.id}</p>
          </div>

          <ChevronRight className="text-gray/30" size={18} />
        </div>

        <p className="mt-2 text-sm font-semibold text-gray">
          <span className="font-extrabold">SERVICE TYPE:</span>{" "}
          {item.serviceType}
        </p>

        <p className="mt-1 text-sm font-medium text-gray/70">{item.address}</p>

        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray">
          <User size={14} />
          Agent: {item.agentName}
        </div>

        {/* tags */}
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md bg-secondary px-2 py-1 text-xs font-bold text-primary">
            {item.tag}
          </span>

          {item.status === "today" ? (
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
              Visit Today
            </span>
          ) : (
            <span className="rounded-md bg-secondary px-2 py-1 text-xs font-bold text-primary">
              Upcoming Visit
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
