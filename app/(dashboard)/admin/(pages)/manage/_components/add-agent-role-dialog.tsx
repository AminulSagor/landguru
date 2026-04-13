"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FilePenLine,
  FileText,
  Gavel,
  HardHat,
  Home,
  Key,
  Landmark,
  Ruler,
  Settings,
  UserRound,
  Users,
} from "lucide-react";

import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import Dialog from "@/components/dialogs/dialog";
import type { CreateAgentRolePayload } from "@/types/admin/manage/agent-roles/create-agent-role.types";
import type {
  AgentRoleBadgeColor,
  AgentRoleIconKey,
  AgentRoleItem,
} from "@/types/admin/manage/agent-roles/agent-roles-list.types";

const ICONS: Array<{ key: AgentRoleIconKey; Icon: LucideIcon }> = [
  { key: "icon-gavel", Icon: Gavel },
  { key: "icon-ruler", Icon: Ruler },
  { key: "icon-file-pen-line", Icon: FilePenLine },
  { key: "icon-users", Icon: Users },
  { key: "icon-landmark", Icon: Landmark },
  { key: "icon-key", Icon: Key },
  { key: "icon-file-text", Icon: FileText },
  { key: "icon-settings", Icon: Settings },
  { key: "icon-briefcase", Icon: Briefcase },
  { key: "icon-hard-hat", Icon: HardHat },
  { key: "icon-home", Icon: Home },
  { key: "icon-user-round", Icon: UserRound },
];

const COLORS: Array<{ key: AgentRoleBadgeColor; hex: string }> = [
  { key: "purple", hex: "#7C3AED" },
  { key: "orange", hex: "#F97316" },
  { key: "teal", hex: "#14B8A6" },
  { key: "green", hex: "#22C55E" },
  { key: "red", hex: "#EF4444" },
  { key: "blue", hex: "#3B82F6" },
  { key: "indigo", hex: "#6366F1" },
];

function badgePreviewBg(color: AgentRoleBadgeColor) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  if (color === "indigo") return "bg-[#E0E7FF] text-[#3730A3]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

const DEFAULT_ICON: AgentRoleIconKey = "icon-gavel";
const DEFAULT_BADGE_COLOR: AgentRoleBadgeColor = "purple";

export default function AddAgentRoleDialog({
  open,
  onOpenChange,
  onSave,
  role,
  isSubmitting = false,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSave: (payload: CreateAgentRolePayload) => Promise<void> | void;
  role?: AgentRoleItem | null;
  isSubmitting?: boolean;
}) {
  const [name, setName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<AgentRoleIconKey>(DEFAULT_ICON);
  const [badgeColor, setBadgeColor] =
    useState<AgentRoleBadgeColor>(DEFAULT_BADGE_COLOR);

  const isEditMode = Boolean(role);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (role) {
      setName(role.name);
      setShortCode(role.shortCode);
      setDescription(role.description);
      setIcon(role.icon || DEFAULT_ICON);
      setBadgeColor(role.badgeColor || DEFAULT_BADGE_COLOR);
      return;
    }

    setName("");
    setShortCode("");
    setDescription("");
    setIcon(DEFAULT_ICON);
    setBadgeColor(DEFAULT_BADGE_COLOR);
  }, [open, role]);

  const previewName = useMemo(() => name.trim() || "Legal Advisor", [name]);
  const SelectedIcon = ICONS.find((item) => item.key === icon)?.Icon ?? Gavel;
  const isSaveDisabled =
    isSubmitting || !name.trim() || !shortCode.trim() || !description.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg">
      <div className="flex items-center justify-between border-b border-gray/10 pb-3">
        <h3 className="text-lg font-semibold text-primary">
          {isEditMode ? "Update Agent Role" : "Add Agent Role"}
        </h3>
      </div>

      <div className="py-5 space-y-5">
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            LIVE PREVIEW
          </p>

          <Card className="mt-2 border border-gray/10 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${badgePreviewBg(
                  badgeColor,
                )}`}
              >
                <SelectedIcon className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-primary">{previewName}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-gray">
                  {shortCode.trim() || "ROLE"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <p className="text-[11px] font-semibold tracking-widest text-gray">
              ROLE NAME
            </p>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none placeholder:text-gray"
              placeholder="Enter role name"
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <p className="text-[11px] font-semibold tracking-widest text-gray">
              SHORT CODE
            </p>
            <input
              value={shortCode}
              onChange={(event) => setShortCode(event.target.value.toUpperCase())}
              className="mt-2 h-11 w-full rounded-xl border border-gray/15 bg-white px-4 text-sm text-primary outline-none placeholder:text-gray"
              placeholder="LAW"
              maxLength={8}
            />
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            DESCRIPTION
          </p>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 min-h-[110px] w-full rounded-xl border border-gray/15 bg-white px-4 py-3 text-sm text-primary outline-none placeholder:text-gray"
            placeholder="Enter short description"
          />
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            SELECT ICON
          </p>

          <Card className="mt-3 border border-gray/10 bg-[#F8FAFC] p-5">
            <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
              {ICONS.map(({ key, Icon }) => {
                const active = key === icon;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setIcon(key)}
                    className={[
                      "flex h-12 w-full items-center justify-center rounded-2xl border transition",
                      active
                        ? "border-primary bg-white shadow-sm"
                        : "border-transparent bg-transparent hover:bg-white/80",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5 text-[#64748B]" />
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gray">
            BADGE COLOR
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {COLORS.map((colorItem) => {
              const active = colorItem.key === badgeColor;

              return (
                <button
                  key={colorItem.key}
                  type="button"
                  onClick={() => setBadgeColor(colorItem.key)}
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    active ? "ring-2 ring-primary ring-offset-2" : "",
                  ].join(" ")}
                >
                  <span
                    className="h-8 w-8 rounded-full"
                    style={{ background: colorItem.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray/10 px-6 py-5">
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
              shortCode: shortCode.trim(),
              description: description.trim(),
              icon,
              badgeColor,
            });
          }}
        >
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Saving..."
            : "Save Role"}
        </Button>
      </div>
    </Dialog>
  );
}
