"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Folder,
  Gavel,
  Globe,
  Home,
  Map,
  Scale,
  Search,
  Shield,
  User,
} from "lucide-react";

import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import Dialog from "@/components/dialogs/dialog";
import type { CreateServiceTypePayload } from "@/types/admin/manage/services/create-service-type.types";
import type {
  ServiceTypeBadgeColor,
  ServiceTypeIconKey,
  ServiceTypeItem,
} from "@/types/admin/manage/services/service-types-list.types";

const ICONS: Array<{ key: ServiceTypeIconKey; Icon: LucideIcon }> = [
  { key: "icon-doc-check", Icon: Gavel },
  { key: "icon-map", Icon: Map },
  { key: "icon-ruler", Icon: FileText },
  { key: "icon-doc-pen", Icon: Home },
  { key: "icon-folder", Icon: Search },
  { key: "icon-badge-check", Icon: Shield },
  { key: "icon-file-up", Icon: Scale },
  { key: "icon-shield", Icon: Folder },
  { key: "icon-package", Icon: Globe },
  { key: "icon-man", Icon: User },
];

const COLORS: Array<{ key: ServiceTypeBadgeColor; hex: string }> = [
  { key: "purple", hex: "#7C3AED" },
  { key: "orange", hex: "#F97316" },
  { key: "teal", hex: "#14B8A6" },
  { key: "green", hex: "#22C55E" },
  { key: "red", hex: "#EF4444" },
  { key: "blue", hex: "#3B82F6" },
  { key: "indigo", hex: "#6366F1" },
];

function badgePreviewBg(color: ServiceTypeBadgeColor) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  if (color === "indigo") return "bg-[#E0E7FF] text-[#3730A3]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

const DEFAULT_ICON: ServiceTypeIconKey = "icon-doc-check";
const DEFAULT_BADGE_COLOR: ServiceTypeBadgeColor = "purple";

export default function AddServiceTypeDialog({
  open,
  onOpenChange,
  onSave,
  service,
  isSubmitting = false,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSave: (payload: CreateServiceTypePayload) => Promise<void> | void;
  service?: ServiceTypeItem | null;
  isSubmitting?: boolean;
}) {
  const [isMandatory, setIsMandatory] = useState(true);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState<ServiceTypeIconKey>(DEFAULT_ICON);
  const [badgeColor, setBadgeColor] =
    useState<ServiceTypeBadgeColor>(DEFAULT_BADGE_COLOR);

  const isEditMode = Boolean(service);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (service) {
      setIsMandatory(service.isMandatory);
      setName(service.name);
      setDesc(service.description);
      setIcon(service.icon || DEFAULT_ICON);
      setBadgeColor(service.badgeColor || DEFAULT_BADGE_COLOR);
      return;
    }

    setIsMandatory(true);
    setName("");
    setDesc("");
    setIcon(DEFAULT_ICON);
    setBadgeColor(DEFAULT_BADGE_COLOR);
  }, [open, service]);

  const previewName = useMemo(
    () => name.trim() || "Ownership Validation",
    [name],
  );

  const SelectedIcon = ICONS.find((item) => item.key === icon)?.Icon ?? Gavel;
  const isSaveDisabled = isSubmitting || !name.trim() || !desc.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg">
      <div className="flex items-center justify-between border-b border-gray/10">
        <h3 className="text-lg font-semibold pb-3">
          {isEditMode ? "Update Service Type" : "Add New Service Type"}
        </h3>
      </div>

      <div className="py-5 space-y-5">
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            LIVE PREVIEW
          </p>

          <Card className="mt-2 p-4 border border-gray/10">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center ${badgePreviewBg(badgeColor)}`}
              >
                <SelectedIcon className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">{previewName}</p>
            </div>
          </Card>
        </div>

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

          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="radio"
              checked={!isMandatory}
              onChange={() => setIsMandatory(false)}
              className="h-4 w-4"
            />
            Optional
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Service Name</p>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm outline-none placeholder:text-gray"
            />
          </div>

          <div>
            <p className="text-sm font-semibold">Short Description</p>
            <textarea
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
              className="mt-2 min-h-24 w-full rounded-xl border border-gray/15 bg-white px-4 py-3 text-sm text-primary outline-none placeholder:text-gray"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary">Service Icon</p>

          <div className="inline-flex items-center rounded-xl bg-[#EEF2F7] p-1">
            <button
              type="button"
              className="h-10 rounded-lg px-4 text-sm font-medium text-[#475467]"
            >
              Upload
            </button>
            <button
              type="button"
              className="h-10 rounded-lg bg-white px-4 text-sm font-semibold text-primary shadow-sm"
            >
              Select Icon
            </button>
          </div>
        </div>

        <Card className="border border-gray/10 bg-[#F8FAFC] p-5">
          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gap: "20px 16px",
            }}
          >
            {ICONS.map(({ key, Icon }) => {
              const active = key === icon;

              return (
                <div key={key} className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIcon(key)}
                    className={[
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition",
                      active
                        ? "border-2 border-primary bg-white shadow-sm"
                        : "border-2 border-transparent bg-transparent hover:bg-white/70",
                    ].join(" ")}
                  >
                    <Icon className="h-6 w-6 text-[#64748B]" strokeWidth={2} />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <div>
          <p className="text-sm font-semibold">Badge Color</p>

          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {COLORS.map((colorItem) => {
              const active = colorItem.key === badgeColor;

              return (
                <button
                  key={colorItem.key}
                  type="button"
                  onClick={() => setBadgeColor(colorItem.key)}
                  className={[
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    active ? "ring-2 ring-primary" : "",
                  ].join(" ")}
                >
                  <span
                    className="h-7 w-7 rounded-full"
                    style={{ background: colorItem.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

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
          disabled={isSaveDisabled}
          onClick={() => {
            void onSave({
              name: name.trim(),
              isMandatory,
              description: desc.trim(),
              icon,
              badgeColor,
            });
          }}
        >
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Saving..."
            : isEditMode
              ? "Save Service Type"
              : "Save Service Type"}
        </Button>
      </div>
    </Dialog>
  );
}
