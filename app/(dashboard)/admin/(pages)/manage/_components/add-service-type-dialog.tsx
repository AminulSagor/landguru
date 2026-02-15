"use client";

import { useMemo, useState } from "react";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";

import {
  FileCheck2,
  Map,
  Ruler,
  FilePenLine,
  Folder,
  BadgeCheck,
  FileUp,
  Shield,
  Package,
  X,
} from "lucide-react";
import Dialog from "@/components/dialogs/dialog";
import {
  BadgeColorKey,
  ManageServiceType,
  ServiceIconKey,
} from "@/app/(dashboard)/admin/types/manage-service-type";

const ICONS: { key: ServiceIconKey; Icon: any }[] = [
  { key: "doc-check", Icon: FileCheck2 },
  { key: "map", Icon: Map },
  { key: "ruler", Icon: Ruler },
  { key: "doc-pen", Icon: FilePenLine },
  { key: "folder", Icon: Folder },
  { key: "badge-check", Icon: BadgeCheck },
  { key: "file-up", Icon: FileUp },
  { key: "shield", Icon: Shield },
  { key: "package", Icon: Package },
];

const COLORS: { key: BadgeColorKey; hex: string }[] = [
  { key: "purple", hex: "#7C3AED" },
  { key: "orange", hex: "#F97316" },
  { key: "teal", hex: "#14B8A6" },
  { key: "green", hex: "#22C55E" },
  { key: "red", hex: "#EF4444" },
  { key: "blue", hex: "#3B82F6" },
  { key: "indigo", hex: "#6366F1" },
];

function badgePreviewBg(color: BadgeColorKey) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  if (color === "indigo") return "bg-[#E0E7FF] text-[#3730A3]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

export default function AddServiceTypeDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (row: ManageServiceType) => void;
}) {
  const [isMandatory, setIsMandatory] = useState(true);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState<ServiceIconKey>("doc-check");
  const [badgeColor, setBadgeColor] = useState<BadgeColorKey>("purple");

  const previewName = useMemo(
    () => name.trim() || "Ownership Validation",
    [name],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg">
      {/* header */}
      <div className="flex items-center justify-between  border-b border-gray/10">
        <h3 className="text-lg font-semibold pb-3">Add New Service Type</h3>
      </div>

      <div className="py-5 space-y-5">
        {/* live preview */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            LIVE PREVIEW
          </p>

          <Card className="mt-2 p-4 border border-gray/10">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center ${badgePreviewBg(badgeColor)}`}
              >
                {(() => {
                  const I =
                    ICONS.find((i) => i.key === icon)?.Icon ?? FileCheck2;
                  return <I className="h-4 w-4" />;
                })()}
              </div>
              <p className="text-sm font-semibold ">{previewName}</p>
            </div>
          </Card>
        </div>

        {/* mandatory / optional */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="radio"
              checked={isMandatory}
              onChange={() => setIsMandatory(true)}
              className="h-4 w-4"
            />
            Mandatory
          </label>

          <label className="flex items-center gap-2 text-sm font-semibold ">
            <input
              type="radio"
              checked={!isMandatory}
              onChange={() => setIsMandatory(false)}
              className="h-4 w-4"
            />
            Optional
          </label>
        </div>

        {/* inputs */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Service Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm  outline-none placeholder:text-gray"
              placeholder=""
            />
          </div>

          <div>
            <p className="text-sm font-semibold">Short Description</p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-2 min-h-24 w-full rounded-xl border border-gray/15 bg-white px-4 py-3 text-sm text-primary outline-none placeholder:text-gray"
              placeholder=""
            />
          </div>
        </div>

        {/* service icon */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary">Service Icon</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 rounded-lg bg-secondary px-3 text-xs font-semibold"
            >
              Upload
            </button>
            <button
              type="button"
              className="h-8 rounded-lg bg-primary px-3 text-xs font-semibold text-white"
            >
              Select Icon
            </button>
          </div>
        </div>

        <Card className="p-4 border border-gray/10 bg-white">
          <div className="grid grid-cols-6 gap-3">
            {ICONS.map(({ key, Icon }) => {
              const active = key === icon;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIcon(key)}
                  className={[
                    "h-10 rounded-xl border flex items-center justify-center",
                    active
                      ? "border-primary bg-secondary"
                      : "border-gray/15 bg-white hover:bg-secondary",
                  ].join(" ")}
                >
                  <Icon
                    className={
                      active ? "h-5 w-5 text-primary" : "h-5 w-5 text-gray"
                    }
                  />
                </button>
              );
            })}
          </div>
        </Card>

        {/* badge color */}
        <div>
          <p className="text-sm font-semibold">Badge Color</p>

          <div className="mt-3 flex items-center gap-3">
            {COLORS.map((c) => {
              const active = c.key === badgeColor;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setBadgeColor(c.key)}
                  className={[
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    active ? "ring-2 ring-primary" : "",
                  ].join(" ")}
                >
                  <span
                    className="h-7 w-7 rounded-full"
                    style={{ background: c.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray/10">
        <Button
          variant="secondary"
          onClick={() => onOpenChange(false)}
          className="h-10 px-6 text-sm"
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          size="base"
          onClick={() => {
            const nowId = `srv-${Math.random().toString(36).slice(2, 8)}`;
            onSave({
              id: nowId,
              name: previewName,
              description: desc.trim() || "—",
              createdAt: "20 Jan, 2026",
              isActive: true,
              icon,
              badgeColor,
              isMandatory,
            });
            onOpenChange(false);
          }}
        >
          Save Service Type
        </Button>
      </div>
    </Dialog>
  );
}
