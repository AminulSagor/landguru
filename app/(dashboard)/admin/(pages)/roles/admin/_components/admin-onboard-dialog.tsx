"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { Camera, ChevronDown, User, Lock } from "lucide-react";
import Dialog from "@/components/dialogs/dialog";
import { adminCreateService } from "@/service/admin/admin-list/create-admin.service";
import { operationalZonesService } from "@/service/admin/operational-zones.service";
import type { AdminCreatePayload } from "@/types/admin/admin-list/admin-create.types";
import type { OperationalZone } from "@/types/operational-zones/operational-zone.types";

type RoleLevel = "location";

export default function AdminOnBoardDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const labelCls = "text-sm font-medium text-black";
  const sectionCls =
    "text-[11px] font-semibold tracking-widest text-gray uppercase";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [street, setStreet] = useState("");

  const [selectedZoneId, setSelectedZoneId] = useState<string | undefined>(undefined);
  const [roleLevel, setRoleLevel] = useState<RoleLevel>("location");

  const [password, setPassword] = useState("LandGuru@2026#XYZ");

  const { data: zonesData, isLoading: isZonesLoading } = useQuery({
    queryKey: ["operational-zones"],
    queryFn: () => operationalZonesService.getAllZones(),
  });

  const canSubmit = useMemo(() => {
    return fullName.trim() && phone.trim() && email.trim();
  }, [fullName, phone, email]);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: AdminCreatePayload) =>
      adminCreateService.createAdmin(payload),
    onSuccess: (response) => {
      toast.success(response?.message ?? "Admin created");
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-summary-metrics"] });
      onOpenChange(false);
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || error?.message || "Failed to create admin";
      toast.error(msg);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-gray/10">
        <p className="text-lg font-semibold text-black">New Admin Profile</p>
        <p className="mt-1 text-sm font-normal text-gray">
          Fill in personal details, address, and assign zone access.
        </p>
      </div>

      {/* BODY */}
      <div className="px-6 py-5 space-y-6">
        {/* VISUAL IDENTITY */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <p className={sectionCls}>VISUAL IDENTITY</p>

            <div className="mt-3 flex flex-col items-start gap-3">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border border-dashed border-gray/25 bg-secondary flex items-center justify-center">
                  <User className="h-8 w-8 text-gray" />
                </div>

                <button
                  type="button"
                  className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <button type="button" className="text-sm font-medium text-gray">
                Change Photo
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 space-y-4">
            {/* FULL NAME */}
            <div>
              <p className={labelCls}>Full Name</p>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-primary bg-white px-4 text-sm text-black outline-none"
              />
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <p className={labelCls}>Phone Number (Login ID)</p>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <p className={labelCls}>Email Address</p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PERSONAL ADDRESS */}
        <div>
          <p className={sectionCls}>PERSONAL ADDRESS</p>

          <div className="mt-4 grid grid-cols-12 gap-4">
            <FieldSelect label="Division" value={division} onChange={setDivision} />
            <FieldSelect label="District" value={district} onChange={setDistrict} />
            <FieldSelect
              label="Thana / Upazila"
              value={thana}
              onChange={setThana}
              span="col-span-12 md:col-span-6"
            />

            <div className="col-span-12">
              <p className={labelCls}>Full Street Address</p>
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
              />
            </div>
          </div>
        </div>

        {/* ZONE ASSIGNMENT */}
        <Card className="p-5 bg-secondary/20">
          <div className="flex items-center gap-2 text-sm font-semibold text-black">
            <span className="h-8 w-8 rounded-lg bg-white border border-gray/10 flex items-center justify-center">
              <User className="h-4 w-4 text-black" />
            </span>
            Zone Assignment & Role
          </div>

          <div className="mt-5">
            <p className={sectionCls}>ASSIGN LOCATION</p>

            <div className="mt-2">
              {isZonesLoading ? (
                <div className="h-11 flex items-center px-4 rounded-xl border border-gray/15 bg-white text-sm text-gray">Loading zones...</div>
              ) : (
                <select
                  value={selectedZoneId ?? ""}
                  onChange={(e) => setSelectedZoneId(e.target.value || undefined)}
                  className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
                >
                  <option value="">Select an operational zone</option>
                  {zonesData?.zones?.map((z: OperationalZone) => (
                    <option key={z.id} value={z.id}>
                      {z.zoneName} — {z.district}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#E9F2FF] px-4 py-3">
              <p className="text-sm font-medium text-black">
                Selected: {zonesData?.zones?.find((z) => z.id === selectedZoneId)?.zoneName ?? "None"}
              </p>
              <span className="rounded-md bg-primary px-3 py-1 text-[11px] font-semibold text-white">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="mt-5">
            <p className={labelCls}>Role Level</p>

            <label className="mt-3 flex items-center gap-2 text-sm font-medium text-gray">
              <input
                type="radio"
                checked={roleLevel === "location"}
                onChange={() => setRoleLevel("location")}
              />
              Location Wise Admin
            </label>
          </div>
        </Card>

        {/* SECURITY */}
        <div>
          <p className={sectionCls}>SECURITY & CREDENTIALS</p>

          <div className="mt-4">
            <p className={labelCls}>Password</p>

            <div className="mt-2 flex overflow-hidden rounded-xl border border-gray/15 bg-white">
              <div className="flex flex-1 items-center gap-2 px-4">
                <Lock className="h-4 w-4 text-gray" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full bg-transparent text-sm font-medium text-black outline-none"
                />
              </div>

              <button
                type="button"
                className="h-11 px-4 border-l border-gray/10 text-sm font-medium text-black bg-secondary/20"
                onClick={() =>
                  setPassword(
                    "LandGuru@" + Math.floor(Math.random() * 9000 + 1000)
                  )
                }
              >
                New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-5 border-t border-gray/10 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="text-sm font-medium text-gray hover:text-black"
        >
          Cancel
        </button>

        <Button
          variant="primary"
          size="base"
          disabled={!canSubmit || createMutation.isPending}
          onClick={() => {
            if (!canSubmit || createMutation.isPending) return;

            const payload: AdminCreatePayload = {
              name: fullName.trim(),
              phone: phone.trim(),
              email: email.trim(),
              division: division || undefined,
              district: district || undefined,
              thana: thana || undefined,
              fullAddress: street || undefined,
              ...(selectedZoneId ? { adminZoneId: selectedZoneId } : {}),
              password: password || undefined,
            };

            createMutation.mutate(payload);
          }}
        >
          {createMutation.isPending ? "Creating..." : "Create Admin Profile"}
        </Button>
      </div>
    </Dialog>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  span,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  span?: string;
}) {
  return (
    <div className={span ?? "col-span-12 md:col-span-6"}>
      <p className="text-sm font-medium text-black">{label}</p>

      <div className="mt-2 flex h-11 w-full items-center justify-between rounded-xl border border-gray/15 bg-white px-4">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-black outline-none"
        />
        <ChevronDown className="h-4 w-4 text-gray" />
      </div>
    </div>
  );
}
