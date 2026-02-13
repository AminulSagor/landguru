// components/profile/ProfileOverview.tsx
"use client";

import React from "react";
import Card from "@/components/cards/card";
import {
  ChevronRight,
  Pencil,
  User,
  Lock,
  BadgeCheck,
  FileText,
  LogOut,
} from "lucide-react";
import { ProfileOverviewData } from "@/app/(dashboard)/user/types/profile";
import { demoProfileOverview } from "@/app/(dashboard)/user/dummy-data/profile";
import Link from "next/link";

export default function ProfileOverview({
  data = demoProfileOverview,

  onLogout,
}: {
  data?: ProfileOverviewData;
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onLogout?: () => void;
}) {
  return (
    <div className="w-full max-w-5xl space-y-5 py-25 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-7 items-start">
        <div className="md:col-span-3 space-y-4">
          {/* Top grid */}
          <div>
            {/* User Card */}
            <Card className="md:col-span-2">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-primary/15 p-1">
                    <div className="h-full w-full rounded-full bg-primary/80" />
                  </div>

                  <button
                    type="button"
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm active:scale-[0.97] transition"
                    aria-label="Edit avatar"
                  >
                    <Pencil size={16} />
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-extrabold text-gray">
                  {data.name}
                </h2>

                <div className="mt-2">
                  {data.isVerified ? <VerifiedPill /> : null}
                </div>

                <p className="mt-2 text-sm font-semibold text-gray/70">
                  {data.email}
                </p>
              </div>
            </Card>
          </div>

          {/* Settings */}
          <SettingRow
            icon={<User size={18} />}
            title="Edit Profile Information"
            subTitle="Update your personal details and address"
            link={"/dashboard/profile/edit-profile"}
          />

          <SettingRow
            icon={<Lock size={18} />}
            title="Change Password"
            subTitle="Update your password and security settings"
            link="/dashboard/profile/change-password"
          />

          {/* Verification Documents */}
          <Card className="space-y-4">
            <h3 className="text-sm font-extrabold text-gray">
              Verification Documents
            </h3>

            <div className="space-y-3">
              {data.verificationDocs.map((d) => (
                <DocRow
                  key={d.id}
                  icon={
                    d.id === "nid" ? (
                      <FileText size={18} />
                    ) : (
                      <FileText size={18} />
                    )
                  }
                  title={d.title}
                  subTitle={d.subTitle}
                  isVerified={d.isVerified}
                />
              ))}
            </div>
          </Card>

          {/* Logout */}
          <Card className="py-4">
            <button
              type="button"
              onClick={onLogout}
              className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-xl cursor-pointer  bg-white px-4 py-3 text-sm font-extrabold text-red-500 hover:bg-red-500/5 active:scale-[0.99] transition"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </Card>
        </div>

        {/* Account Summary */}
        <Card className="md:col-span-2">
          <h3 className="text-sm font-extrabold text-gray">Account Summary</h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray/70">Member Since</p>
              <p className="text-xs font-extrabold text-gray">
                {data.summary.memberSince}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray/70">Active Deals</p>
              <p className="text-xs font-extrabold text-gray">
                {data.summary.activeDeals}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray/70">
                Properties Listed
              </p>
              <p className="text-xs font-extrabold text-gray">
                {data.summary.propertiesListed}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function VerifiedPill() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-3 py-1 text-xs font-extrabold text-green">
      <BadgeCheck size={14} />
      Verified
    </span>
  );
}

function SettingRow({
  icon,
  title,
  subTitle,
  onClick,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
  onClick?: () => void;
  link: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full"
      aria-label={title}
    >
      <Link href={link}>
        <Card className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>

            <div className="text-left">
              <p className="text-sm font-extrabold text-gray">{title}</p>
              <p className="mt-0.5 text-xs font-semibold text-gray/70">
                {subTitle}
              </p>
            </div>
          </div>

          <ChevronRight size={18} className="text-gray/60" />
        </Card>
      </Link>
    </button>
  );
}

function DocRow({
  icon,
  title,
  subTitle,
  isVerified,
}: {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
  isVerified: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div>
          <p className="text-sm font-extrabold text-gray">{title}</p>
          <p className="mt-0.5 text-xs font-semibold text-gray/70">
            {subTitle}
          </p>
        </div>
      </div>

      {isVerified ? <VerifiedPill /> : null}
    </div>
  );
}
