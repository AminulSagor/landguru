"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
import type { OperationalZoneItem } from "@/types/admin/manage/locations/operational-zones-list.types";
import {
  demoDistrictsByDivision,
  demoDivisions,
} from "@/app/(dashboard)/admin/dummy-data/manage-location.demo";

interface ZoneFormPayload {
  zoneName: string;
  division: string;
  district: string;
  thana: string;
  isActive: boolean;
}

export default function AddZoneDialog({
  open,
  onOpenChange,
  onSave,
  zone,
  isSubmitting = false,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (payload: ZoneFormPayload) => Promise<void> | void;
  zone?: OperationalZoneItem | null;
  isSubmitting?: boolean;
}) {
  const isEditMode = Boolean(zone);
  const [zoneName, setZoneName] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!open) {
      return;
    }

    setZoneName(zone?.zoneName ?? "");
    setDivision(zone?.division ?? "");
    setDistrict(zone?.district ?? "");
    setThana(zone?.thana ?? "");
    setIsActive(zone?.isActive ?? true);
  }, [open, zone]);

  const districts = useMemo(() => {
    if (!division) return [];
    return demoDistrictsByDivision[division] ?? [];
  }, [division]);

  const isSaveDisabled =
    isSubmitting ||
    !zoneName.trim() ||
    (!isEditMode && (!division || !district || !thana.trim()));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center justify-between pb-4 border-b border-gray/10">
        <h3 className="text-lg font-semibold text-primary">
          {isEditMode ? "Update Operational Zone" : "Add Operational Zone"}
        </h3>
      </div>

      <div className="pt-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray">Zone Name</p>
          <input
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none placeholder:text-gray"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray">Division</p>
          <div className="relative mt-2">
            <select
              value={division}
              disabled={isEditMode}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
              }}
              className="h-11 w-full appearance-none rounded-xl border border-gray/15 bg-white px-4 pr-10 text-sm text-primary outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="" />
              {demoDivisions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray">District</p>
          <div className="relative mt-2">
            <select
              value={district}
              disabled={isEditMode}
              onChange={(e) => setDistrict(e.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-gray/15 bg-white px-4 pr-10 text-sm text-primary outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="" />
              {districts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray">Thana/Area Name</p>
          <input
            value={thana}
            disabled={isEditMode}
            onChange={(e) => setThana(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none placeholder:text-gray disabled:cursor-not-allowed disabled:bg-gray-50"
          />
        </div>

        {isEditMode ? (
          <div>
            <p className="text-sm font-semibold text-gray">Status</p>
            <div className="mt-2 flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-primary">
                <input
                  type="radio"
                  checked={isActive}
                  onChange={() => setIsActive(true)}
                  className="h-4 w-4"
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-primary">
                <input
                  type="radio"
                  checked={!isActive}
                  onChange={() => setIsActive(false)}
                  className="h-4 w-4"
                />
                Inactive
              </label>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray/10">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            size="base"
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="base"
            disabled={isSaveDisabled}
            onClick={() => {
              void onSave({
                zoneName: zoneName.trim(),
                division: division.trim(),
                district: district.trim(),
                thana: thana.trim(),
                isActive,
              });
            }}
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
                ? "Update Location"
                : "Save Location"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
