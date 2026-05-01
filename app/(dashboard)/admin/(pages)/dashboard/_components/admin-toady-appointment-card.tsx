"use client";

import Card from "@/components/cards/card";
import { cn } from "@/utils/classnames.utils";
import { CalendarDays, ChevronRight, Plus } from "lucide-react";

type Person = {
  name: string;
  roleText?: string; // (Client) / Internal Team
  avatarUrl?: string; // optional
};

type AppointmentItem = {
  id: string;
  badgeText: "TODAY" | "AM" | "PM";
  time: string; // "10:30" / "02:00"
  title: string;
  people: Person[];
  showArrow?: boolean;
};

const demoAppointments: AppointmentItem[] = [
  {
    id: "a1",
    badgeText: "TODAY",
    time: "10:30",
    title: "Site Visit - Plot 45",
    people: [{ name: "Mr. Ahmed", roleText: "(Client)" }],
    showArrow: true,
  },
  {
    id: "a2",
    badgeText: "PM",
    time: "02:00",
    title: "Contract Signing",
    people: [{ name: "Mrs. Khan" }],
  },
  {
    id: "a3",
    badgeText: "PM",
    time: "04:15",
    title: "Agent Monthly Sync",
    people: [{ name: "Internal Team" }, { name: "Internal Team" }, { name: "Internal Team" }],
  },
];

function InitialAvatar({ name }: { name: string }) {
  const initial = (name?.trim()?.[0] || "U").toUpperCase();
  return (
    <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-xs font-extrabold text-gray">
      {initial}
    </div>
  );
}

function PeopleRow({ people }: { people: Person[] }) {
  // if multiple: show stacked avatars + text "Internal Team"
  const multiple = people.length > 1;

  return (
    <div className="mt-2 flex items-center gap-2">
      {multiple ? (
        <div className="flex -space-x-2">
          {people.slice(0, 3).map((p, idx) => (
            <div key={idx} className="ring-2 ring-white rounded-full">
              <InitialAvatar name={p.name} />
            </div>
          ))}
        </div>
      ) : (
        <InitialAvatar name={people[0]?.name || "User"} />
      )}

      <div className="text-sm font-semibold text-gray/60">
        {multiple ? (
          "Internal Team"
        ) : (
          <>
            {people[0]?.name}{" "}
            {people[0]?.roleText && (
              <span className="font-semibold text-gray/40">{people[0].roleText}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function AppointmentRow({ item }: { item: AppointmentItem }) {
  const isToday = item.badgeText === "TODAY";

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-gray/5 px-4 py-4">
      {/* left time badge */}
      <div className="flex items-center gap-4">
        <div className="w-[72px] rounded-lg bg-white border border-gray/10 px-3 py-2 text-center">
          <div
            className={cn(
              "text-xs font-extrabold tracking-wide",
              isToday ? "text-red" : "text-gray/50"
            )}
          >
            {item.badgeText}
          </div>
          <div className="mt-1 text-lg font-extrabold text-gray leading-none">
            {item.time}
          </div>
        </div>

        {/* main text */}
        <div>
          <div className="text-sm font-extrabold text-gray">{item.title}</div>
          <PeopleRow people={item.people} />
        </div>
      </div>

      {/* right */}
      {item.showArrow ? (
        <ChevronRight className="text-gray/30" size={20} />
      ) : (
        <div className="w-5" />
      )}
    </div>
  );
}

export default function AdminTodaysAppointmentsCard({
  title = "Today's Appointments",
  appointments = demoAppointments,
}: {
  title?: string;
  appointments?: AppointmentItem[];
}) {
  return (
    <Card className="rounded-2xl border border-gray/10 bg-white p-0 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-6 py-5">
        <h3 className="text-base font-extrabold text-gray">{title}</h3>
        <div className="text-gray/40">
          <CalendarDays size={18} />
        </div>
      </div>

      <div className="h-px w-full bg-gray/10" />

      {/* content */}
      <div className="px-6 py-5 space-y-4">
        {appointments.map((a) => (
          <AppointmentRow key={a.id} item={a} />
        ))}

        {/* spacer like screenshot */}
        <div className="h-12" />

        {/* add appointment dashed box */}
        <div className="rounded-2xl border border-dashed border-gray/20 bg-white p-5">
          <button className="w-full flex items-center justify-center gap-2 text-sm font-extrabold text-gray/60 hover:text-gray">
            <Plus size={16} />
            Add Appointment
          </button>
        </div>
      </div>
    </Card>
  );
}
