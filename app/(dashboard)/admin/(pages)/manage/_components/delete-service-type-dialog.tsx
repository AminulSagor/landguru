"use client";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";

export default function DeleteServiceTypeDialog({
  open,
  onOpenChange,
  onConfirm,
  serviceName,
  isDeleting = false,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  serviceName: string;
  isDeleting?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="border-b border-gray/10 pb-4">
        <h3 className="text-lg font-semibold text-[#DC2626]">Delete Service Type</h3>
      </div>

      <div className="py-5 space-y-2">
        <p className="text-sm font-medium text-[#DC2626]">
          Are you sure you want to delete this service type?
        </p>
        <p className="text-sm text-gray">
          {serviceName || "This item"} will be removed from the list.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray/10 pt-4">
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={isDeleting}
          onClick={onConfirm}
          className="border-[#DC2626] bg-[#DC2626] text-white hover:bg-[#B91C1C]"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Dialog>
  );
}
