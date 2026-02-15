"use client";

import { useMemo, useState } from "react";
import Button from "@/components/buttons/button";
import { ChevronDown, X } from "lucide-react";
import { ManageZoneRow } from "@/app/(dashboard)/admin/types/manage-location.types";
import {
  demoDistrictsByDivision,
  demoDivisions,
} from "@/app/(dashboard)/admin/dummy-data/manage-location.demo";
import Dialog from "@/components/dialogs/dialog";

export default function AddZoneDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (row: ManageZoneRow) => void;
}) {
  const [zoneName, setZoneName] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");

  const districts = useMemo(() => {
    if (!division) return [];
    return demoDistrictsByDivision[division] ?? [];
  }, [division]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray/10">
        <h3 className="text-lg font-semibold text-primary">
          Add Operational Zone
        </h3>
      </div>

      <div className="pt-5 space-y-4">
        {/* Zone Name */}
        <div>
          <p className="text-sm font-semibold text-gray">Zone Name</p>
          <input
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none placeholder:text-gray"
          />
        </div>

        {/* Division */}
        <div>
          <p className="text-sm font-semibold text-gray">Division</p>
          <div className="relative mt-2">
            <select
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
              }}
              className="h-11 w-full appearance-none rounded-xl border border-gray/15 bg-white px-4 pr-10 text-sm text-primary outline-none"
            >
              <option value="" />
              {demoDivisions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
          </div>
        </div>

        {/* District */}
        <div>
          <p className="text-sm font-semibold text-gray">District</p>
          <div className="relative mt-2">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-gray/15 bg-white px-4 pr-10 text-sm text-primary outline-none"
            >
              <option value="" />
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
          </div>
        </div>

        {/* Thana/Area */}
        <div>
          <p className="text-sm font-semibold text-gray">Thana/Area Name</p>
          <input
            value={thana}
            onChange={(e) => setThana(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none placeholder:text-gray"
          />
        </div>

        {/* footer */}
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
            onClick={() => {
              const id = `z-${Math.random().toString(36).slice(2, 8)}`;
              onSave({
                id,
                zoneName: zoneName.trim() || "—",
                parent: {
                  division: division || "—",
                  district: district || "—",
                },
                createdAt: "Oct 24, 2023",
                isActive: true,
                thanaOrArea: thana.trim() || "",
              });
              onOpenChange(false);
              setZoneName("");
              setDivision("");
              setDistrict("");
              setThana("");
            }}
          >
            Save Location
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
