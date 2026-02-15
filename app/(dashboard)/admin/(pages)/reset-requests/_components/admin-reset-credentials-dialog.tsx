"use client";

import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import Image from "next/image";
import { ResetRequest } from "@/app/(dashboard)/admin/types/admin-reset-types";
import { AlertTriangle, Copy, Lock, RefreshCcw, X, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import Dialog from "@/components/dialogs/dialog";

function makePassword() {
  // simple demo password generator
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LandGuru@2026#${suffix}`;
}

export default function AdminResetCredentialsDialog({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  data: ResetRequest;
}) {
  const [autoPassword, setAutoPassword] = useState(() => makePassword());
  const [manualPassword, setManualPassword] = useState("");
  const [showManual, setShowManual] = useState(false);

  const displayZone = useMemo(() => `Admin - ${data.zone}`, [data.zone]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray/10">
        <h3 className="text-lg font-semibold text-primary">
          Reset Credentials
        </h3>
      </div>

      <div className="px-2 py-5 space-y-5">
        {/* Profile card */}
        <Card className="p-4 bg-white border border-gray/10">
          <div className="flex items-center gap-4">
            <Image
              src={data.avatar}
              width={64}
              height={64}
              alt="avatar"
              className="rounded-full"
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-semibold text-primary">
                  {data.name}
                </p>

                <span className="rounded-md bg-[#FFE8D6] px-3 py-1 text-xs font-semibold text-[#9A3412]">
                  {displayZone}
                </span>
              </div>

              <div className="mt-1 space-y-1 text-sm">
                <p className="text-primary font-medium">{data.adminId}</p>
                <p className="text-gray font-medium">{data.phone}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Security warning */}
        <div className="flex items-start gap-3 rounded-xl border border-[#F5DFA8] bg-[#FFF9E8] px-4 py-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-[#F59E0B]" />
          <div>
            <p className="text-sm font-semibold text-[#7C2D12]">
              Security Warning
            </p>
            <p className="mt-1 text-sm font-medium text-[#9A3412]">
              Verify the agent&apos;s identity via phone call before proceeding.
            </p>
          </div>
        </div>

        {/* Option 1 */}
        <div>
          <p className="text-base font-semibold text-primary">
            Option 1: Auto-Generate
          </p>

          <div className="mt-3 flex items-stretch overflow-hidden rounded-xl border border-gray/15 bg-white">
            <div className="flex flex-1 items-center bg-secondary px-4 py-4">
              <p className="text-sm font-semibold text-primary">
                {autoPassword}
              </p>
            </div>

            <div className="flex items-center divide-x divide-gray/10">
              <button
                type="button"
                onClick={() => setAutoPassword(makePassword())}
                className="flex items-center gap-2 px-5 py-4 text-sm font-semibold text-gray hover:text-primary"
              >
                <RefreshCcw className="h-4 w-4" />
                Generate New
              </button>

              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(autoPassword)}
                className="flex items-center gap-2 px-5 py-4 text-sm font-semibold text-gray hover:text-primary"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray/15" />
          <p className="text-xs font-semibold text-gray">OR</p>
          <div className="h-px flex-1 bg-gray/15" />
        </div>

        {/* Option 2 */}
        <div>
          <p className="text-base font-semibold text-primary">
            Option 2: Manual Set
          </p>

          <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray/15 bg-white px-4 py-3">
            <Lock className="h-4 w-4 text-gray" />
            <input
              type={showManual ? "text" : "password"}
              value={manualPassword}
              onChange={(e) => setManualPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-gray"
            />

            <button
              type="button"
              onClick={() => setShowManual((v) => !v)}
              className="text-gray hover:text-primary"
              aria-label="Toggle password visibility"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-2 text-xs font-medium text-gray">
            Must be at least 8 characters with a mix of letters, numbers &amp;
            symbols.
          </p>
        </div>
      </div>

      {/* Footer */}
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
          size="base"
          className=" bg-[#E03131] hover:bg-[#C92A2A] text-white"
        >
          <RefreshCcw className="h-4 w-4" />
          Confirm &amp; Reset
        </Button>
      </div>
    </Dialog>
  );
}
