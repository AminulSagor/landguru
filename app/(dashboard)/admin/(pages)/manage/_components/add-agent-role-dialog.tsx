"use client";

import { useMemo, useState } from "react";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { X } from "lucide-react";

import {
  Scale,
  Ruler,
  FilePenLine,
  Users,
  Landmark,
  Key,
  FileText,
  Settings,
  Briefcase,
  HardHat,
} from "lucide-react";
import Dialog from "@/components/dialogs/dialog";
import {
  AgentRoleIconKey,
  AgentRoleRow,
  BadgeColorKey,
} from "@/app/(dashboard)/admin/types/agent-role.types";

const ICONS: { key: AgentRoleIconKey; label: string; Icon: any }[] = [
  { key: "legal", label: "Legal", Icon: Scale },
  { key: "survey", label: "Survey", Icon: Ruler },
  { key: "deed", label: "Deed", Icon: FilePenLine },
  { key: "field", label: "Field", Icon: Users },
  { key: "finance", label: "Finance", Icon: Landmark },
  { key: "key", label: "Key", Icon: Key },
  { key: "doc", label: "Doc", Icon: FileText },
  { key: "gear", label: "Gear", Icon: Settings },
  { key: "bag", label: "Bag", Icon: Briefcase },
  { key: "helmet", label: "Helmet", Icon: HardHat },
  { key: "home", label: "Home", Icon: Landmark },
  { key: "users", label: "Users", Icon: Users },
];

const COLORS: { key: BadgeColorKey; hex: string }[] = [
  { key: "purple", hex: "#7C3AED" },
  { key: "orange", hex: "#F97316" },
  { key: "teal", hex: "#14B8A6" },
  { key: "green", hex: "#22C55E" },
  { key: "red", hex: "#EF4444" },
  { key: "blue", hex: "#3B82F6" },
];

function badgeBg(color: BadgeColorKey) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

export default function AddAgentRoleDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (row: AgentRoleRow) => void;
}) {
  const [roleName, setRoleName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<AgentRoleIconKey>("finance");
  const [badgeColor, setBadgeColor] = useState<BadgeColorKey>("red");

  const previewName = useMemo(
    () => roleName.trim() || "Financial Officer",
    [roleName],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md">
      {/* header */}
      <div className="flex items-center justify-between py-5 border-b border-gray/10">
        <h3 className="text-lg font-semibold text-primary">Add Agent Role</h3>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* inputs row */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <p className="text-[11px] font-semibold tracking-widest text-gray">
              ROLE NAME
            </p>
            <input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none"
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <p className="text-[11px] font-semibold tracking-widest text-gray">
              SHORT CODE
            </p>
            <input
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value.toUpperCase())}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none"
            />
          </div>
        </div>

        {/* description */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            DESCRIPTION
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 min-h-[110px] w-full rounded-xl border border-gray/15 bg-white px-4 py-3 text-sm text-primary outline-none"
          />
        </div>

        {/* icons */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            SELECT ICON
          </p>

          <div className="mt-3 grid grid-cols-6 gap-3">
            {ICONS.map(({ key, Icon }) => {
              const active = key === icon;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIcon(key)}
                  className={[
                    "h-11 rounded-xl border flex items-center justify-center",
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
        </div>

        {/* colors + preview */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="text-[11px] font-semibold tracking-widest text-gray">
              BADGE COLOR
            </p>

            <div className="mt-3 flex items-center gap-3 flex-wrap">
              {COLORS.map((c) => {
                const active = c.key === badgeColor;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setBadgeColor(c.key)}
                    className={[
                      "h-10 w-10 rounded-full flex items-center justify-center border-2",
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

          <div className="col-span-12 md:col-span-6">
            <p className="text-[11px] font-semibold tracking-widest text-gray">
              LIVE PREVIEW
            </p>

            <Card className="mt-3 p-4 border border-gray/10">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${badgeBg(badgeColor)}`}
                >
                  {(() => {
                    const I = ICONS.find((i) => i.key === icon)?.Icon ?? Users;
                    return <I className="h-4 w-4" />;
                  })()}
                </div>

                <p className="text-sm font-semibold text-primary">
                  {previewName}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray/10">
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
            const id = `r-${Math.random().toString(36).slice(2, 8)}`;
            onSave({
              id,
              roleName: previewName,
              shortCode: (shortCode || "ROLE").slice(0, 6),
              description: description.trim() || "—",
              isActive: true,
              icon,
              badgeColor,
            });
            onOpenChange(false);
            setRoleName("");
            setShortCode("");
            setDescription("");
            setIcon("finance");
            setBadgeColor("red");
          }}
          size="base"
        >
          Save Role
        </Button>
      </div>
    </Dialog>
  );
}
