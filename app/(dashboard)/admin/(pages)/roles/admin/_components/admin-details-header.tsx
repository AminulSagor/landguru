import Button from "@/components/buttons/button";
import { Pencil, RotateCcw, Ban, Trash2 } from "lucide-react";

export default function AdminDetailsHeader({
  breadcrumbName,
}: {
  breadcrumbName: string;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row  md:items-center justify-between">
      <div className="text-sm font-medium text-gray">
        <span className="text-primary">Admins</span>
        <span className="mx-2">/</span>
        <span className="text-primary">{breadcrumbName}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <button className="text-[#EF4444] hover:opacity-90" aria-label="Delete">
          <Trash2 className="h-4 w-4" />
        </button>

        <Button variant="primary" size="base">
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>

        <Button variant="secondary" size="base">
          <RotateCcw className="h-4 w-4" />
          Reset Password
        </Button>

        <Button
          variant="primary"
          size="base"
          className="bg-[#EF4444] hover:bg-[#d83b3b] text-white"
        >
          <Ban className="h-4 w-4" />
          Suspend Account
        </Button>
      </div>
    </div>
  );
}
