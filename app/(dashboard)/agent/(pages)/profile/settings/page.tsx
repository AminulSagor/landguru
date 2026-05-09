"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { agentProfileService } from "@/service/agent/agent-profile.service";
import { uploadFileWithPresign, validateImageFile } from "@/utils/upload.utils";
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
  frontUrl?: string;
  backUrl?: string;
  certificateUrl?: string;
};

export default function EditProfilePage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [unionOrCityCorp, setUnionOrCityCorp] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankSwiftCode, setBankSwiftCode] = useState("");
  const [bankRoutingNo, setBankRoutingNo] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [verifiedDocs, setVerifiedDocs] = useState<VerifiedDoc[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    agentProfileService
      .getProfile()
      .then((p) => {
        if (!mounted) return;
        setFullName(p.fullName ?? p.personalDetails?.fullName ?? "");
        setPhone(p.phone ?? p.personalDetails?.phone ?? "");
        setEmail(p.email ?? p.personalDetails?.email ?? "");
        const flat = p as any;
        setDivision(p.personalDetails?.division ?? flat.division ?? "");
        setDistrict(p.personalDetails?.district ?? flat.district ?? "");
        setUpazila(p.personalDetails?.upazila ?? flat.upazila ?? "");
        setUnionOrCityCorp(p.personalDetails?.unionOrCityCorp ?? flat.unionOrCityCorp ?? "");
        setWardNo(p.personalDetails?.wardNo ?? flat.wardNo ?? "");
        setPostalCode((p.personalDetails?.postalCode ?? flat.postalCode ?? "") as string);
        setFullAddress(p.personalDetails?.fullAddress ?? flat.fullAddress ?? p.assignedLocation ?? "");
        setBankName(p.bankInfo?.bankName ?? flat.bankName ?? "");
        setBankAccountNo(p.bankInfo?.bankAccountNo ?? flat.bankAccountNo ?? "");
        setBankSwiftCode(p.bankInfo?.bankSwiftCode ?? flat.bankSwiftCode ?? "");
        setBankRoutingNo(p.bankInfo?.bankRoutingNo ?? flat.bankRoutingNo ?? "");
        setPhotoUrl(p.photoUrl ?? "");
        // map verification docs from API shape to UI model
        try {
          const v = (p as any).verificationDocs ?? flat ?? {};

          const maskId = (id?: string | null) => {
            if (!id) return "—";
            const s = String(id);
            if (s.length <= 4) return s;
            const midLen = Math.max(0, s.length - 4);
            return `${s.slice(0, 2)}${"*".repeat(midLen)}${s.slice(-2)}`;
          };

          setVerifiedDocs([
            {
              title: "National ID (NID)",
              idLabel: "ID:",
              idValue: v.nidNumber ? maskId(v.nidNumber) : "—",
              verified: !!v.isNIDVerified,
              frontUrl: v.nidFrontUrl ?? undefined,
              backUrl: v.nidBackUrl ?? undefined,
            },
            {
              title: "TIN Certificate",
              idLabel: "Tax ID:",
              idValue: v.tinNumber ? maskId(v.tinNumber) : "—",
              verified: !!v.isTINVerified,
              certificateUrl: v.tinCertificateUrl ?? undefined,
            },
          ]);
        } catch (err) {
          setVerifiedDocs([]);
        }
      })
      .catch((err) => console.error("Failed to load profile", err));

    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        fullName,
        email,
        photoUrl,
        phone,
        division,
        district,
        upazila,
        unionOrCityCorp,
        wardNo,
        postalCode,
        fullAddress,
        bankName,
        bankAccountNo,
        bankSwiftCode,
        bankRoutingNo,
      };

      const res = await agentProfileService.updateProfile(body);
      if (res?.message) alert(res.message);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePickPhoto = () => {
    if (uploadingPhoto) return;
    setPhotoError(null);
    fileInputRef.current?.click();
  };

  const handlePhotoInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.ok) {
      setPhotoError(validation.error ?? "Invalid file.");
      return;
    }

    setUploadingPhoto(true);
    setUploadProgress(0);
    setPhotoError(null);

    try {
      const uploaded = await uploadFileWithPresign({
        file,
        type: "AVATAR",
        onProgress: setUploadProgress,
      });
      const finalUrl = uploaded.fileUrl || uploaded.uploadUrl;
      if (!finalUrl) throw new Error("Upload succeeded but file URL was missing.");

      const res = await agentProfileService.updatePhoto(finalUrl);
      setPhotoUrl(finalUrl);
      if (res?.message) alert(res.message);
    } catch (err: any) {
      console.error(err);
      setPhotoError(err?.message ?? "Failed to upload photo.");
    } finally {
      setUploadingPhoto(false);
      setUploadProgress(0);
    }
  };

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
                src={photoUrl || "/images/avatars/avatar.png"}
                alt="Profile"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={handlePickPhoto}
              disabled={uploadingPhoto}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-sm hover:opacity-90 disabled:opacity-60"
              aria-label="Change photo"
            >
              <Pencil size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={handlePickPhoto}
            disabled={uploadingPhoto}
            className="mt-2 text-xs font-bold text-primary hover:opacity-80 disabled:opacity-60"
          >
            {uploadingPhoto ? "Uploading..." : "Change Photo"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoInputChange}
          />

          {uploadingPhoto ? (
            <p className="mt-2 text-xs font-semibold text-gray/60">
              Uploading {uploadProgress}%
            </p>
          ) : null}

          {photoError ? (
            <p className="mt-2 text-xs font-semibold text-red-600">{photoError}</p>
          ) : null}
        </div>
      </div>

      {/* Personal Details */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-6">
        <SectionTitle icon={<User size={16} />} title="Personal Details" />

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <TextInput label="Full Name" required value={fullName} onChange={setFullName} />
          <TextInput label="Phone Number" required value={phone} onChange={setPhone} />
          <TextInput label="Email Address" required value={email} onChange={setEmail} />

          <TextInput label="Division" required value={division} onChange={setDivision} />
          <TextInput label="District" required value={district} onChange={setDistrict} />
          <TextInput label="Upazilla" required value={upazila} onChange={setUpazila} />

          <TextInput
            label="Pouroshova/City Corp/Union"
            required
            value={unionOrCityCorp}
            onChange={setUnionOrCityCorp}
          />
          <TextInput label="Ward No" required value={wardNo} onChange={setWardNo} />
          <TextInput label="Postal Code" value={postalCode} onChange={setPostalCode} />
        </div>

        <div className="mt-4">
          <Label>Full Address</Label>
          <textarea
            className={[
              "mt-2 w-full rounded-xl border border-gray/10 bg-gray/20",
              "px-4 py-3 text-sm font-semibold",
              "outline-none min-h-[92px]",
            ].join(" ")}
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
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
          {verifiedDocs.map((d, idx) => (
            <DocCard key={idx} d={d} />
          ))}
        </div>

        <div className="mt-5">
          <Button className="w-full" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>

      {/* Bank Information */}
      <Card className="rounded-2xl border border-gray/10 bg-white p-6">
        <SectionTitle icon={<Landmark size={16} />} title="Bank Information" />

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <TextInput label="BANK NAME" value={bankName} onChange={setBankName} />
            <div className="h-px w-full bg-gray/10" />
            <TextInput label="SWIFT CODE" value={bankSwiftCode} onChange={setBankSwiftCode} />
          </div>

          <div className="space-y-5">
            <TextInput label="BANK ACCOUNT NO." value={bankAccountNo} onChange={setBankAccountNo} />
            <div className="h-px w-full bg-gray/10" />
            <TextInput label="ROUTING NO." value={bankRoutingNo} onChange={setBankRoutingNo} />
          </div>
        </div>
      </Card>
    </div>
  );
}

/* demo docs removed — using API-provided verificationDocs */

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
  readOnly = false,
  onChange,
}: {
  label: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (v: string) => void;
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
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
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

      <div className="flex items-center gap-3">
        {d.frontUrl && (
          <a
            href={d.frontUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-primary underline"
          >
            Front
          </a>
        )}

        {d.backUrl && (
          <a
            href={d.backUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-primary underline"
          >
            Back
          </a>
        )}

        {d.certificateUrl && (
          <a
            href={d.certificateUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-primary underline"
          >
            View
          </a>
        )}

        {d.verified && (
          <div className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1.5">
            <BadgeCheck className="text-green" size={16} />
            <span className="text-xs font-extrabold text-green">Verified</span>
          </div>
        )}
      </div>
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
