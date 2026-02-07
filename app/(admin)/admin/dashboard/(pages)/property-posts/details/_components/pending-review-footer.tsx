"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
import { cn } from "@/lib/utils";

export default function PendingReviewFooter({
  propertyId,
}: {
  propertyId: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const onReject = () => {
    // TODO: call reject api with { propertyId, reason }
    setOpen(false);
  };

  return (
    <Card className="flex items-center justify-between gap-4">
      <Button
        onClick={() => setOpen(true)}
        className="border border-[#EF4444] bg-white text-[#EF4444] hover:bg-[#FEF2F2]"
      >
        Reject Post
      </Button>

      <Button variant="primary" onClick={() => setOpen(true)}>
        Submit Quote to User <ArrowRight size={18} />
      </Button>

      {/* rejection dialog */}
      <Dialog open={open} onOpenChange={setOpen} size="md">
        <div>
          {/* header */}
          <div className="flex items-start justify-between gap-4 border-b border-gray/20 pb-2">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray">
                Reject Post{" "}
                <span className="font-semibold text-[#EF4444]">
                  #{propertyId}
                </span>
              </p>
              <p className="text-sm text-gray">Are you sure?</p>
            </div>
          </div>

          {/* body */}
          <div>
            <p className="mb-3 text-sm font-semibold text-[#EF4444]">
              Write the reason for rejection
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={7}
              placeholder=""
              className={cn(
                "w-full resize-none rounded-xl border px-4 py-4 text-sm text-gray outline-none",
                "border-[#EF4444] bg-[#FEF2F2] focus:ring-2 focus:ring-[#EF4444]/20",
              )}
            />

            <div className="pt-6">
              <Button
                onClick={onReject}
                className={cn(
                  "w-full justify-center rounded-xl border bg-white py-4",
                  "border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2]",
                )}
              >
                Reject Post
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </Card>
  );
}
