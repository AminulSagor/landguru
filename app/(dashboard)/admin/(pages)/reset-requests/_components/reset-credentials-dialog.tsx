"use client";

import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import type { ResetRequestRow } from "@/app/(dashboard)/admin/types/reset-requests-types";
import Image from "next/image";
import {
  Copy,
  RefreshCcw,
  Phone,
  BadgeCheck,
  AlertTriangle,
  Lock,
  Eye,
} from "lucide-react";
import { useMemo, useState } from "react";

const roleChip: Record<string, string> = {
  Surveyor: "bg-[#fff7ed] text-[#c2410c]",
  Lawyer: "bg-[#EFF6FF] text-primary border border-primary/15",
  "Deed Writer": "bg-[#F3E8FF] text-[#7c3aed]",
  "Field Assistant": "bg-secondary text-green border border-gray/10",
};

function genPassword() {
  // simple static-like generator
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `LandGuru@2026#${suffix}`;
}

export default function ResetCredentialsDialog({
  open,
  onOpenChange,
  row,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  row: ResetRequestRow | null;
}) {
  const [autoPass, setAutoPass] = useState(genPassword());
  const [manualPass, setManualPass] = useState("");
  const [show, setShow] = useState(false);

  const data = useMemo(() => row, [row]);
  if (!open || !data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg" className="p-0">
      <div className="px-7 pt-6 pb-6">
        {/* header */}
        <div className="flex items-start justify-between">
          <p className="text-xl font-semibold text-black">Reset Credentials</p>
          {/* Dialog already has close button; this is only visual match - optional */}
        </div>

        {/* agent card */}
        <div className="mt-5 rounded-xl border border-gray/10 bg-white px-5 py-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden border border-gray/10 bg-secondary">
            <Image
              src={data.agent.avatar}
              alt={data.agent.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-black">
                {data.agent.name}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  roleChip[data.agent.role] ||
                  "bg-secondary text-gray border border-gray/10"
                }`}
              >
                {data.agent.role}
              </span>
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <BadgeCheck size={16} className="text-gray" />
                <span className="text-primary font-medium">
                  {data.details.agentId}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-gray" />
                <span className="text-gray">{data.details.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* warning */}
        <div className="mt-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-5 py-4 flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
            <AlertTriangle size={18} className="text-[#B45309]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#92400E]">
              Security Warning
            </p>
            <p className="text-sm text-[#92400E] mt-1">
              Verify the agent&apos;s identity via phone call before proceeding.
            </p>
          </div>
        </div>

        {/* option 1 */}
        <div className="mt-6">
          <p className="text-base font-semibold text-black">
            Option 1: Auto-Generate
          </p>

          <div className="mt-3 rounded-xl border border-gray/15 bg-white overflow-hidden">
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-7 px-4 py-4 bg-secondary">
                <p className="text-lg font-semibold text-black">{autoPass}</p>
              </div>

              <div className="col-span-12 md:col-span-5 px-4 py-3 flex items-center justify-end gap-4">
                <button
                  type="button"
                  className="text-sm text-gray flex items-center gap-2 hover:text-black"
                  onClick={() => setAutoPass(genPassword())}
                >
                  <RefreshCcw size={16} className="text-gray" />
                  Generate New
                </button>

                <span className="h-5 w-px bg-gray/15" />

                <button
                  type="button"
                  className="text-sm text-gray flex items-center gap-2 hover:text-black"
                  onClick={() => navigator.clipboard.writeText(autoPass)}
                >
                  <Copy size={16} className="text-gray" />
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* OR divider */}
        <div className="mt-7 flex items-center gap-4">
          <div className="h-px bg-gray/10 flex-1" />
          <p className="text-xs text-gray uppercase">or</p>
          <div className="h-px bg-gray/10 flex-1" />
        </div>

        {/* option 2 */}
        <div className="mt-6">
          <p className="text-base font-semibold text-black">
            Option 2: Manual Set
          </p>

          <div className="mt-3 rounded-xl border border-gray/15 bg-white px-4 h-12 flex items-center gap-3">
            <Lock size={18} className="text-gray" />
            <input
              value={manualPass}
              onChange={(e) => setManualPass(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full outline-none text-sm text-black placeholder:text-gray"
            />
            <button
              type="button"
              className="text-gray hover:text-black"
              onClick={() => setShow((s) => !s)}
              aria-label="Toggle password visibility"
            >
              <Eye size={18} />
            </button>
          </div>

          <p className="mt-2 text-xs text-gray">
            Must be at least 8 characters with a mix of letters, numbers &amp;
            symbols.
          </p>
        </div>

        {/* footer */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            className="bg-white border border-gray/15 hover:bg-secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          {/* screenshot uses red button; allowed (custom) */}
          <Button
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white h-11 px-6"
            onClick={() => {
              // static action for now
              onOpenChange(false);
            }}
          >
            <RefreshCcw size={16} />
            Confirm &amp; Reset
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
