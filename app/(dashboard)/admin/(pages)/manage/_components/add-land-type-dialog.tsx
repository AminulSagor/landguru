"use client";

import { useMemo, useState } from "react";
import Button from "@/components/buttons/button";
import { Building2, Tractor, Mountain, Store, Waves, Home } from "lucide-react";
import {
  BadgeColorKey,
  LandTypeIconKey,
  LandTypeRow,
} from "@/app/(dashboard)/admin/types/land-type.types";
import Dialog from "@/components/dialogs/dialog";
import {
  badgeColors,
  iconOptions,
} from "@/app/(dashboard)/admin/dummy-data/land-type.demo";

function Icon({ k }: { k: LandTypeIconKey }) {
  const cls = "h-5 w-5";
  if (k === "building") return <Building2 className={cls} />;
  if (k === "tractor") return <Tractor className={cls} />;
  if (k === "mountain") return <Mountain className={cls} />;
  if (k === "store") return <Store className={cls} />;
  if (k === "waves") return <Waves className={cls} />;
  return <Home className={cls} />;
}

export default function AddLandTypeDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (row: LandTypeRow) => void;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState<LandTypeIconKey>("building");
  const [badgeColor, setBadgeColor] = useState<BadgeColorKey>("blue");

  const previewName = useMemo(() => name.trim() || "Category Name", [name]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md">
      <div className="space-y-5">
        <h3 className="text-lg font-semibold">
          Add Property Category
        </h3>

        {/* Category Name */}
        <div>
          <p className="text-sm font-semibold">Category Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm outline-none"
          />
        </div>

        {/* Icon Selection */}
        <div>
          <p className="text-sm font-semibold">Icon Selection</p>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {iconOptions.map((i) => {
              const active = i.key === icon;
              return (
                <button
                  key={i.key}
                  type="button"
                  onClick={() => setIcon(i.key)}
                  className={[
                    "h-12 rounded-xl border flex items-center justify-center bg-white",
                    active
                      ? "border-primary bg-secondary"
                      : "border-gray/15 hover:bg-secondary",
                  ].join(" ")}
                >
                  <Icon k={i.key} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Badge Color */}
        <div>
          <p className="text-sm font-semibold">Badge Color</p>

          <div className="mt-3 flex items-center gap-3">
            {badgeColors.map((c) => {
              const active = c.key === badgeColor;

              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setBadgeColor(c.key)}
                  className={[
                    "h-10 w-10 rounded-full flex items-center justify-center border transition-all",
                    active ? "" : "border-transparent",
                  ].join(" ")}
                  style={active ? { borderColor: c.hex } : undefined}
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

        {/* Description */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Description</p>
            <p className="text-sm font-medium text-gray">(Optional)</p>
          </div>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-2 min-h-[110px] w-full rounded-xl border border-gray/15 bg-white px-4 py-3 text-sm text-primary outline-none"
          />
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-sm font-semibold text-gray hover:text-primary"
          >
            Cancel
          </button>

          <Button
            variant="primary"
            onClick={() => {
              const id = `lt-${Math.random().toString(36).slice(2, 8)}`;
              onSave({
                id,
                typeName:
                  previewName === "Category Name"
                    ? "New Land Type"
                    : previewName,
                subtitle: "—",
                createdAt: "Oct 24, 2023",
                isActive: true,
                icon,
                badgeColor,
                description: desc.trim() || "",
              });
              onOpenChange(false);
              setName("");
              setDesc("");
              setIcon("building");
              setBadgeColor("blue");
            }}
            size="base"
          >
            Save Category
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
