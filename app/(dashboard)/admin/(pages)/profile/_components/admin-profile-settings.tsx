"use client";

import React from "react";
import Image from "next/image";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/utils/classnames.utils";
import {
  Briefcase,
  CheckCircle2,
  User,
  Lock,
  RotateCcw,
  MapPin,
} from "lucide-react";

/* ---------------- small ui ---------------- */

function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold",
        className
      )}
    >
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px w-full bg-gray/10" />;
}

function ReadOnlyInput({
  value,
}: {
  value: string;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        readOnly
        className={cn(
          "h-11 w-full rounded-lg border border-gray/15 bg-gray/5 px-4 pr-10",
          "text-sm font-semibold text-gray/70 outline-none"
        )}
      />
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray/30">
        <Lock size={16} />
      </div>
    </div>
  );
}

function FieldRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-6">
      <div className="text-sm font-semibold text-gray/60">{label}</div>
      <ReadOnlyInput value={value} />
    </div>
  );
}

/* ---------------- main component ---------------- */

export default function AdminProfile() {
  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* =================== TOP PROFILE CARD =================== */}
      <Card className="rounded-2xl border border-gray/15 bg-white p-0 overflow-hidden">
        <div className="flex items-center justify-between gap-6 px-6 py-5">
          {/* left */}
          <div className="flex items-center gap-5">
            <div className="h-[74px] w-[74px] overflow-hidden rounded-full border-4 border-white shadow-sm">
              <Image
                src="/images/avatars/avatar.png"
                alt="admin"
                width={74}
                height={74}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-gray/90">
                  Admin
                </h2>

                <Pill className="border border-green/20 bg-green/10 text-green">
                  Online
                </Pill>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold text-gray/60">
                <Pill className="bg-primary/10 text-primary">
                  <Briefcase size={16} />
                  Banani Zone
                </Pill>

                <span className="text-gray/30">|</span>

                <span>
                  ID:{" "}
                  <span className="font-extrabold text-gray/70">
                    #ADM-001
                  </span>
                </span>

                <span className="text-gray/30">|</span>

                <span>Joined Jan 2026</span>
              </div>
            </div>
          </div>

          {/* right status block */}
          <div className="hidden md:flex items-center gap-6">
            <div className="h-16 w-px bg-gray/10" />

            <div className="min-w-[280px]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-gray/60">
                  Profile Status
                </p>
                <p className="text-sm font-extrabold text-green">Active</p>
              </div>

              <div className="mt-2 h-1.5 w-full rounded-full bg-green/20 overflow-hidden">
                <div className="h-full w-full rounded-full bg-green" />
              </div>

              <div className="mt-3 flex items-center gap-5 text-xs font-semibold text-green">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  Verified Email
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  Verified Phone
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* =================== TABS ROW =================== */}
      <div className="px-1">
        <div className="flex items-center gap-2 text-sm font-extrabold text-primary">
          <User size={16} />
          General Info
        </div>

        <div className="mt-2 h-[2px] w-[110px] rounded-full bg-primary" />
        <div className="mt-3 h-px w-full bg-gray/10" />
      </div>

      {/* =================== PERSONAL DETAILS =================== */}
      <Card className="rounded-2xl border border-gray/15 bg-white p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-base font-extrabold text-gray/90">
            Personal Details
          </h3>

          <Pill className="border border-gray/15 bg-gray/5 text-gray/60">
            <Lock size={14} />
            READ ONLY
          </Pill>
        </div>

        <Divider />

        <div className="px-6 py-5 space-y-4">
          <FieldRow label="Full Name" value="Admin" />
          <FieldRow label="Email Address" value="admin@landguru.com" />
          <FieldRow label="Phone Number" value="+880 1234567890" />
        </div>
      </Card>

      {/* =================== BOTTOM GRID =================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credentials Management */}
        <Card className="rounded-2xl border border-gray/15 bg-white p-0 overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-base font-extrabold text-gray/90">
              Credentials Management
            </h3>
          </div>

          <Divider />

          <div className="px-6 py-5 space-y-4">
            <Button className="w-full h-11 rounded-lg">
              <span className="inline-flex items-center gap-2">
                <RotateCcw size={16} />
                Request Password Reset
              </span>
            </Button>

            <div className="rounded-lg border border-orange/30 bg-orange/10 px-4 py-3">
              <p className="text-sm font-semibold text-orange">
                Personal details and credentials can only be modified by the
                Super Admin.
              </p>
            </div>
          </div>
        </Card>

        {/* Zone Assignment */}
        <Card className="rounded-2xl border border-gray/15 bg-white p-0 overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-base font-extrabold text-gray/90">
              Zone Assignment
            </h3>
          </div>

          <Divider />

          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold text-gray/50 tracking-wide">
                ASSIGNED LOCATION
              </p>
              <p className="text-sm font-extrabold text-gray/90">Banani</p>
            </div>

            <div className="rounded-xl border border-gray/15 bg-gray/5 p-4">
              <p className="text-xs font-extrabold text-gray/40 tracking-wide">
                LOCATION
              </p>

              <div className="mt-2 flex items-start gap-3">
                <div className="mt-0.5 text-gray/40">
                  <MapPin size={18} />
                </div>
                <p className="text-sm font-semibold text-gray/70 leading-relaxed">
                  Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213,
                  Dhaka, Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
