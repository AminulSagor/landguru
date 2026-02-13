"use client";

import React from "react";
import Image from "next/image";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { cn } from "@/lib/utils";

/* ---------------- small inputs (same clean style) ---------------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-extrabold text-gray/90 tracking-wide">
      {children}
    </p>
  );
}

function TextInput({
  placeholder,
  className,
  type = "text",
}: {
  placeholder?: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        "h-11 w-full rounded-lg border border-gray/15 bg-white px-4 text-sm font-semibold text-gray outline-none",
        "placeholder:text-gray/30 focus:border-primary/40 focus:ring-2 focus:ring-primary/10",
        className
      )}
    />
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-6 py-5">
      <h3 className="text-base font-extrabold text-gray">{title}</h3>
      <div className="mt-4 h-px w-full bg-gray/10" />
    </div>
  );
}

/* ---------------- page ---------------- */

export default function SuperAdminProfile() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* breadcrumb */}
      <div className="text-sm font-semibold text-gray/50">
        Dashboard <span className="mx-2 text-gray/20">/</span>{" "}
        <span className="text-gray">Profile Settings</span>
      </div>

      {/* Personal Information */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-0 overflow-hidden">
        <SectionHeader title="Personal Information" />

        <div className="px-6 pb-6">
          <div className="grid grid-cols-[84px_1fr] gap-6">
            {/* avatar */}
            <div className="pt-2">
              <div className="h-16 w-16 overflow-hidden rounded-full border border-gray/10">
                <Image
                  src="/images/avatars/avatar.png"
                  alt="profile"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* fields */}
            <div className="space-y-6">
              <div>
                <Label>Full Name</Label>
                <div className="mt-2">
                  <TextInput />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Official Email</Label>
                  <div className="mt-2">
                    <TextInput type="email" />
                  </div>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <div className="mt-2">
                    <TextInput type="tel" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-0 overflow-hidden">
        <SectionHeader title="Security" />

        <div className="px-6 pb-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Label>Current Password</Label>
              <div className="mt-2">
                <TextInput type="password" />
              </div>
            </div>
            <div>
              <Label>New Password</Label>
              <div className="mt-2">
                <TextInput type="password" />
              </div>
            </div>
            <div>
              <Label>Confirm New</Label>
              <div className="mt-2">
                <TextInput type="password" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-0 overflow-hidden">
        <SectionHeader title="Preferences" />

        <div className="px-6 pb-6">
          <Label>Email Notifications</Label>

          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3 text-sm font-semibold text-gray/70">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray/20 text-primary focus:ring-primary/20"
              />
              System Alerts &amp; Critical Updates
            </label>

            <label className="flex items-center gap-3 text-sm font-semibold text-gray/70">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray/20 text-primary focus:ring-primary/20"
              />
              Weekly Revenue Reports
            </label>
          </div>
        </div>
      </Card>

      {/* footer actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="secondary" className="h-11 px-6 rounded-lg">
          Discard
        </Button>
        <Button className="h-11 px-6 rounded-lg">Save Changes</Button>
      </div>
    </div>
  );
}
