"use client";

import { useEffect, useMemo, useState } from "react";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import type { AdminRow } from "@/app/(dashboard)/admin/types/admin-list-type";

type ZoneOption = {
  id: string;
  name: string;
};

type EditAdminPayload = {
  fullName: string;
  phone: string;
  email: string;
  adminZoneId?: string;
};

export default function EditAdminDialog({
  open,
  onOpenChange,
  admin,
  zones,
  isSubmitting,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: AdminRow | null;
  zones: ZoneOption[];
  isSubmitting?: boolean;
  onSave: (payload: EditAdminPayload) => void;
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zoneId, setZoneId] = useState("");

  const zoneMatchId = useMemo(() => {
    if (!admin) return "";
    const adminZone = admin.assignedLocation.toLowerCase();
    const match = zones.find((zone) =>
      adminZone.includes(zone.name.toLowerCase()),
    );
    return match?.id ?? "";
  }, [admin, zones]);

  useEffect(() => {
    if (!admin) {
      setFullName("");
      setPhone("");
      setEmail("");
      setZoneId("");
      return;
    }

    setFullName(admin.name);
    setPhone(admin.phone);
    setEmail(admin.email);
    setZoneId(zoneMatchId);
  }, [admin, zoneMatchId]);

  const canSubmit = fullName.trim() && phone.trim() && email.trim();

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md">
      <div className="space-y-5">
        <div>
          <p className="text-lg font-semibold text-black">Edit Admin Profile</p>
          <p className="mt-1 text-sm text-gray">
            Update contact details and zone assignment.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-black">Full Name</p>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
            />
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <p className="text-sm font-medium text-black">Phone Number</p>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <p className="text-sm font-medium text-black">Email Address</p>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-black">Assigned Zone</p>
            <select
              value={zoneId}
              onChange={(event) => setZoneId(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-black outline-none"
            >
              <option value="">Keep current zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
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
            disabled={!canSubmit || isSubmitting}
            onClick={() =>
              onSave({
                fullName: fullName.trim(),
                phone: phone.trim(),
                email: email.trim(),
                ...(zoneId ? { adminZoneId: zoneId } : {}),
              })
            }
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
