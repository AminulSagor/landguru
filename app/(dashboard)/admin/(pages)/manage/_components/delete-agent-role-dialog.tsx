"use client";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";

export default function DeleteAgentRoleDialog({
  open,
  onOpenChange,
  onConfirm,
  roleName,
  isDeleting = false,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  roleName: string;
  isDeleting?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="border-b border-gray/10 pb-4">
        <h3 className="text-lg font-semibold text-[#DC2626]">Delete Agent Role</h3>
      </div>

      <div className="space-y-2 py-5">
        <p className="text-sm font-medium text-[#DC2626]">
          Are you sure you want to delete this agent role?
        </p>
        <p className="text-sm text-gray">
          {roleName || "This role"} will be removed from the list.
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
