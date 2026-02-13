"use client";

import React from "react";
import Image from "next/image";
import Card from "@/components/cards/card";
import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  Pencil,
  Wallet,
  CheckCircle2,
  User,
  Wrench,
} from "lucide-react";
import Link from "next/link";

type ProfileData = {
  name: string;
  agentId: string;
  agentType: string;
  verified: boolean;
  avatarUrl: string;

  totalTaskCompleted: number;
  totalEarned: number;

  assignedLocationTitle: string;
  assignedLocation: string;

  services: string[];
};

const profileData: ProfileData = {
  name: "Adv. Sahil",
  agentId: "LAW-2026-0001",
  agentType: "Lawyer",
  verified: true,
  avatarUrl: "/images/avatars/avatar.png",

  totalTaskCompleted: 12,
  totalEarned: 4000,

  assignedLocationTitle: "Assigned Location:",
  assignedLocation:
    "Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",

  services: [
    "Ownership History Validation",
    "Pentagraph Map Validation",
    "Physical estimate and border demarcation",
    "Document Organization",
    "Deed Writing Service",
    "Namjari/DCR Update/ Pouro City Corp Record Update",
    "Inheritance Dispute Analysis",
    "Government Acquisition Risk",
    "Court Case Verification",
  ],
};

/* ---------------- page ---------------- */

export default function ProfilePage() {
  const d = profileData;

  return (
    <div className="grid gap-6 lg:grid-cols-12 max-w-7xl mx-auto">
      {/* LEFT */}
      <div className="space-y-6 col-span-12 lg:col-span-4">
        {/* profile card */}
        <Card className="rounded-2xl border border-gray/10 bg-white p-6">
          <div className="flex flex-col items-center text-center">
            {/* avatar */}
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full border border-gray/10 bg-secondary">
                <Image
                  src={d.avatarUrl}
                  alt={d.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* edit bubble */}
              <button
                type="button"
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-sm hover:opacity-90"
                aria-label="Edit profile"
              >
                <Pencil size={14} />
              </button>
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-gray">{d.name}</h2>

            <p className="mt-2 text-sm font-semibold text-gray/50">
              Agent ID: {d.agentId}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray/50">
              Agent Type:{" "}
              <span className="text-gray/70 font-extrabold">{d.agentType}</span>
            </p>

            {d.verified && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green/10 px-4 py-2">
                <BadgeCheck className="text-green" size={16} />
                <span className="text-sm font-extrabold text-green">
                  Verified
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* view profile information row */}
        <Link href={'/agent/profile/settings'}>
          <Card className="rounded-2xl border border-gray/10 bg-white p-4">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl bg-secondary/50 px-5 py-4 hover:opacity-95 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <User size={18} />
                </div>
                <p className="text-sm font-extrabold text-primary">
                  View Profile Information
                </p>
              </div>
              <ChevronRight className="text-gray/30" size={18} />
            </button>
          </Card>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="space-y-6 col-span-12 lg:col-span-8">
        {/* top stats */}
        <div className="grid gap-6 lg:grid-cols-2">
          <StatCard
            title="TOTAL TASK COMPLETED"
            value={d.totalTaskCompleted}
            icon={<CheckCircle2 className="text-green" size={26} />}
          />
          <StatCard
            title="TOTAL EARNED"
            value={
              <span>
                ৳ <span className="tracking-tight">{d.totalEarned}</span>
              </span>
            }
            icon={<Wallet className="text-green" size={26} />}
          />
        </div>

        {/* assigned location */}
        <InfoStrip
          icon={<MapPin size={18} />}
          title={d.assignedLocationTitle}
          subtitle={d.assignedLocation}
        />

        {/* services */}
        <ListCard
          title="Services you Provide:"
          icon={<Wrench size={18} />}
          items={d.services}
        />
      </div>
    </div>
  );
}

/* ---------------- small UI parts ---------------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border border-gray/10 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold tracking-wide text-green">
            {title}
          </p>
          <div className="mt-3 text-4xl font-extrabold text-gray">{value}</div>
        </div>

        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green/10">
            {icon}
          </div>
          {/* faint background ring like ss */}
          <div className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 rounded-full border-[6px] border-green/10" />
        </div>
      </div>
    </Card>
  );
}

function InfoStrip({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-lg border border-primary/15 bg-secondary/30 px-5 py-4">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-extrabold text-gray">{title}</p>
          <p className="mt-1 text-sm font-medium text-gray/60">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function ListCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <Card className="rounded-2xl border border-gray/10 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-extrabold text-gray">{title}</h3>

          <ol className="mt-5 space-y-4">
            {items.map((s, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-sm font-extrabold text-gray">
                  {idx + 1}.
                </span>
                <span className="text-sm font-medium text-gray/90">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-gray/10 pt-4">
            <p className="text-xs font-medium text-gray/40">
              These services were selected on time of the creation of your
              account. If you want to change, contact your assigned admin.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
