// app/(dashboard)/profile/edit/page.tsx  (or components/profile/EditProfilePage.tsx)
"use client";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { useForm } from "react-hook-form";

import {
  ArrowLeft,
  Pencil,
  User,
  ShieldCheck,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { HookFormTextInput } from "@/components/inputs/text-input";
import { HookFormSingleSelect } from "@/components/inputs/select/single.select";
import { HookFormTextareaInput } from "@/components/inputs/text-area";

type Option = { label: string; value: string | number };

export type EditProfileFormValues = {
  fullName: string;
  phone: string;
  email: string;

  division: Option | null;
  district: Option | null;
  upazilla: Option | null;
  pouroshova: Option | null;

  wardNo: Option | null;
  postalCode: string;

  fullAddress: string;
};

export const divisionOptions: Option[] = [
  { label: "Rajshahi", value: "rajshahi" },
  { label: "Dhaka", value: "dhaka" },
  { label: "Chattogram", value: "chattogram" },
];

export const districtOptions: Option[] = [
  { label: "Rajshahi", value: "rajshahi" },
  { label: "Bogura", value: "bogura" },
  { label: "Dhaka", value: "dhaka" },
];

export const upazillaOptions: Option[] = [
  { label: "Bogura", value: "bogura" },
  { label: "Sadar", value: "sadar" },
];

export const pouroshovaOptions: Option[] = [
  { label: "Bogura Pouroshova", value: "bogura_pouroshova" },
  { label: "City Corp", value: "city_corp" },
];

export const wardOptions: Option[] = [
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
];

const demoDefaults: EditProfileFormValues = {
  fullName: "User Name",
  phone: "+8801700000000",
  email: "username@email.com",

  division: { label: "Rajshahi", value: "rajshahi" },
  district: { label: "Rajshahi", value: "rajshahi" },
  upazilla: { label: "Bogura", value: "bogura" },
  pouroshova: { label: "Bogura Pouroshova", value: "bogura_pouroshova" },

  wardNo: { label: "03", value: "03" },
  postalCode: "5800",

  fullAddress:
    "Holding #45, Ward #03, Bogura Pourashava, Bogura Sadar, Bogura-5800, Rajshahi",
};

function GreenStatusPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-green/10 px-4 py-2 text-xs font-extrabold text-green">
      <span className="h-2 w-2 rounded-full bg-green" />
      {text}
    </span>
  );
}

function VerifiedDocCard({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray/10 bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText size={20} />
        </div>

        <div>
          <p className="text-sm font-extrabold text-gray">{title}</p>
          <p className="mt-0.5 text-xs font-semibold text-gray/70">{sub}</p>
        </div>
      </div>

      <span className="inline-flex items-center gap-2 rounded-full bg-green/10 px-4 py-2 text-xs font-extrabold text-green">
        <CheckCircle2 size={16} />
        Verified
      </span>
    </div>
  );
}

export default function EditProfilePage() {
  const form = useForm<EditProfileFormValues>({
    defaultValues: demoDefaults,
    mode: "onChange",
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: EditProfileFormValues) => {
    console.log("submit", values);
  };

  return (
    <div className="w-full max-w-5xl space-y-4 py-25 mx-auto">
      {/* Back */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray/70 hover:text-gray"
        onClick={() => history.back()}
      >
        <ArrowLeft size={18} />
        Back to My Profile
      </button>

      <Card className="!p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-gray/10 px-8 py-6">
          <h1 className="text-2xl font-extrabold text-gray">Edit Profile</h1>
          <GreenStatusPill text="Account Active" />
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-8 py-8">
            {/* Avatar */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-primary/15 p-1">
                  <div className="h-full w-full rounded-full bg-primary/80" />
                </div>

                <button
                  type="button"
                  className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-sm transition active:scale-[0.97]"
                  aria-label="Change photo"
                >
                  <Pencil size={18} />
                </button>
              </div>

              <button
                type="button"
                className="mt-3 text-sm font-extrabold text-primary hover:underline"
              >
                Change Photo
              </button>
            </div>

            {/* Section: Personal Details */}
            <div className="mt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User size={18} />
                </div>
                <h2 className="text-lg font-extrabold text-gray">
                  Personal Details
                </h2>
              </div>

              <div className="mt-6 grid gap-5">
                <HookFormTextInput<EditProfileFormValues>
                  name="fullName"
                  control={control}
                  label="Full Name"
                  placeholder="User Name"
                  rules={{ required: "Full Name is required" }}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <HookFormTextInput<EditProfileFormValues>
                    name="phone"
                    control={control}
                    label="Phone Number"
                    placeholder="+8801700000000"
                    type="tel"
                    disabled
                    rules={{ required: "Phone Number is required" }}
                    inputClassName="bg-gray-200"
                  />

                  <HookFormTextInput<EditProfileFormValues>
                    name="email"
                    control={control}
                    label="Email Address"
                    placeholder="username@email.com"
                    type="email"
                    rules={{ required: "Email is required" }}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <HookFormSingleSelect<EditProfileFormValues>
                    name="division"
                    control={control}
                    label="Division"
                    placeholder="Select division"
                    options={divisionOptions}
                    rules={{ required: true }}
                  />

                  <HookFormSingleSelect<EditProfileFormValues>
                    name="district"
                    control={control}
                    label="District"
                    placeholder="Select district"
                    options={districtOptions}
                    rules={{ required: true }}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <HookFormSingleSelect<EditProfileFormValues>
                    name="upazilla"
                    control={control}
                    label="Upazilla"
                    placeholder="Select upazilla"
                    options={upazillaOptions}
                    rules={{ required: true }}
                  />

                  <HookFormSingleSelect<EditProfileFormValues>
                    name="pouroshova"
                    control={control}
                    label="Pouroshova/City Corp/Union"
                    placeholder="Select"
                    options={pouroshovaOptions}
                    rules={{ required: true }}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <HookFormSingleSelect<EditProfileFormValues>
                    name="wardNo"
                    control={control}
                    label="Ward No"
                    placeholder="Select ward"
                    options={wardOptions}
                    rules={{ required: true }}
                  />

                  <HookFormTextInput<EditProfileFormValues>
                    name="postalCode"
                    control={control}
                    label="Postal Code"
                    placeholder="5800"
                    type="text"
                  />
                </div>

                <HookFormTextareaInput<EditProfileFormValues>
                  name="fullAddress"
                  control={control}
                  label="Full Address"
                  placeholder="Write full address"
                  rows={4}
                />
              </div>
            </div>

            {/* Section: Verification Documents */}
            <div className="mt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck size={18} />
                </div>
                <h2 className="text-lg font-extrabold text-gray">
                  Verification Documents
                </h2>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <VerifiedDocCard title="National ID (NID)" sub="ID: 89***321" />
                <VerifiedDocCard
                  title="TIN Certificate"
                  sub="Tax ID: 44***99"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end border-t border-gray/10 px-8 py-6">
            <Button type="submit" size="md" className="min-w-[160px]">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
