import { ManageZoneRow } from "@/app/(dashboard)/admin/types/manage-location.types";
import StatusSwitch from "./status-switch";
import { ChevronRight, MapPin, Pencil, Trash2 } from "lucide-react";

export default function LocationRow({
  row,
  onToggle,
  onEdit,
  onDelete,
}: {
  row: ManageZoneRow;
  onToggle: (id: string, v: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b border-gray/10 bg-white">
      {/* zone name */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm font-semibold text-primary">{row.zoneName}</p>
        </div>
      </td>

      {/* parent region */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-2 text-sm font-medium text-gray">
          <span>{row.parent.division}</span>
          <ChevronRight className="h-4 w-4 text-gray" />
          <span>{row.parent.district}</span>
        </div>
      </td>

      {/* creation date */}
      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-medium text-gray">{row.createdAt}</p>
      </td>

      {/* status */}
      <td className="px-5 py-5 align-middle">
        <StatusSwitch
          value={row.isActive}
          onChange={(v) => onToggle(row.id, v)}
        />
      </td>

      {/* actions */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => onEdit(row.id)}
            className="text-gray hover:text-primary"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(row.id)}
            className="text-gray hover:text-primary"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
