"use client";

import React from "react";
import Image from "next/image";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import {
  BadgeCheck,
  ChevronRight,
  FileText,
  Landmark,
  Pencil,
  ShieldCheck,
  User,
} from "lucide-react";

type VerifiedDoc = {
  title: string;
  idLabel: string;
  idValue: string;
  verified: boolean;
};

export default function EditProfilePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* header */}
      <div>
        <Breadcrumb />

        {/* page title MUST be black */}
        <h1 className="mt-2 text-2xl font-extrabold text-black">Edit Profile</h1>

        {/* subtitle uses gray/60 */}
        <p className="mt-1 text-sm font-semibold text-gray/60">
          Update your personal information and manage verification documents.
        </p>

        {/* avatar center */}
        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border border-gray/10 bg-secondary">
              <Image
                src="/images/avatars/avatar.png"
                alt="Profile"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-sm hover:opacity-90"
              aria-label="Change photo"
            >
              <Pencil size={14} />
            </button>
          </div>

          <button
            type="button"
            className="mt-2 text-xs font-bold text-primary hover:opacity-80"
          >
            Change Photo
          </button>
        </div>
      </div>

      {/* Personal Details */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-6">
        <SectionTitle icon={<User size={16} />} title="Personal Details" />

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <TextInput label="Full Name" required value="User Name" />
          <TextInput label="Phone Number" required value="+8801700000000" />
          <TextInput label="Email Address" required value="username@email.com" />

          <SelectInput label="Division" required value="Rajshahi" />
          <SelectInput label="District" required value="Rajshahi" />
          <SelectInput label="Upazilla" required value="Bogura" />

          <SelectInput
            label="Pouroshova/City Corp/Union"
            required
            value="Bogura Pouroshova"
          />
          <SelectInput label="Ward No" required value="03" />
          <TextInput label="Postal Code" value="5800" />
        </div>

        <div className="mt-4">
          <Label>Full Address</Label>
          <textarea
            readOnly
            className={[
              "mt-2 w-full rounded-xl border border-gray/10 bg-gray/20",
              "px-4 py-3 text-sm font-semibold",
              "outline-none min-h-[92px]",
            ].join(" ")}
            value="Holding #45, Ward #03, Bogura Pourashava, Bogura Sadar, Bogura-5800, Rajshahi"
          />
        </div>
      </Card>

      {/* Verification Documents */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-6">
        <SectionTitle
          icon={<ShieldCheck size={16} />}
          title="Verification Documents"
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {docs.map((d, idx) => (
            <DocCard key={idx} d={d} />
          ))}
        </div>

        <div className="mt-5">
          <Button className="w-full">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Bank Information */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-6">
        <SectionTitle icon={<Landmark size={16} />} title="Bank Information" />

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <BankRow label="BANK NAME" value="DBBL" />
            <div className="h-px w-full bg-gray/10" />
            <BankRow label="SWIFT CODE" value="DBBLBDDH" />
          </div>

          <div className="space-y-5">
            <BankRow label="BANK ACCOUNT NO." value="123456789123" />
            <div className="h-px w-full bg-gray/10" />
            <BankRow label="ROUTING NO." value="123456789123" />
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- demo docs ---------------- */

const docs: VerifiedDoc[] = [
  {
    title: "National ID (NID)",
    idLabel: "ID:",
    idValue: "89****321",
    verified: true,
  },
  {
    title: "TIN Certificate",
    idLabel: "Tax ID:",
    idValue: "44***99",
    verified: true,
  },
];

/* ---------------- small UI bits ---------------- */

function Breadcrumb() {
  return (
    <div className="text-xs font-semibold text-gray/40">
      Profile <span className="mx-1">›</span> Edit Profile
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      {/* section header MUST be black */}
      <h3 className="text-sm font-extrabold text-black">{title}</h3>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  // label uses gray/60 like ss
  return <p className="text-xs">{children}</p>;
}

function Req() {
  return <span className="ml-1 text-primary">*</span>;
}

function TextInput({
  label,
  required,
  value,
  placeholder,
}: {
  label: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required ? <Req /> : null}
      </Label>

      <input
        value={value ?? ""}
        placeholder={placeholder}
        readOnly
        className={[
          "w-full rounded-xl border border-gray/10 bg-gray/20",
          "px-4 py-3 text-sm font-semibold bg-gray/20",
          "placeholder:text-black outline-none",
        ].join(" ")}
      />
    </div>
  );
}

function SelectInput({
  label,
  required,
  value,
}: {
  label: string;
  required?: boolean;
  value?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required ? <Req /> : null}
      </Label>

      <div
        className={[
          "flex items-center justify-between",
          "w-full rounded-xl border border-gray/10 bg-gray/20",
          "px-4 py-3 text-sm font-semibold",
        ].join(" ")}
      >
        <span>{value ?? "Select"}</span>
        <ChevronRight className="rotate-90 text-gray/30" size={16} />
      </div>
    </div>
  );
}

function DocCard({ d }: { d: VerifiedDoc }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray/10 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText size={18} />
        </div>

        <div>
          {/* doc title is also neutral like page */}
          <p className="text-sm font-extrabold text-black">{d.title}</p>
          <p className="mt-1 text-xs font-semibold text-gray/60">
            {d.idLabel} {d.idValue}
          </p>
        </div>
      </div>

      {d.verified && (
        <div className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1.5">
          <BadgeCheck className="text-green" size={16} />
          <span className="text-xs font-extrabold text-green">Verified</span>
        </div>
      )}
    </div>
  );
}

function BankRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-extrabold tracking-wide text-gray/40">
        {label}
      </p>
      <p className="text-sm font-extrabold text-black">{value}</p>
    </div>
  );
}
