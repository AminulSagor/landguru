import { ChevronRight, MapPin, Pencil, Trash2 } from "lucide-react";

import StatusSwitch from "./status-switch";
import type { OperationalZoneItem } from "@/types/admin/manage/locations/operational-zones-list.types";

function formatCreatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function LocationRow({
  row,
  onToggle,
  onEdit,
}: {
  row: OperationalZoneItem;
  onToggle: (row: OperationalZoneItem, v: boolean) => void;
  onEdit: (row: OperationalZoneItem) => void;
}) {
  return (
    <tr className="border-b border-gray/10 bg-white">
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm font-semibold text-primary">{row.zoneName}</p>
        </div>
      </td>

      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-2 text-sm font-medium text-gray">
          <span>{row.division}</span>
          <ChevronRight className="h-4 w-4 text-gray" />
          <span>{row.district}</span>
        </div>
      </td>

      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-medium text-gray">
          {formatCreatedAt(row.createdAt)}
        </p>
      </td>

      <td className="px-5 py-5 align-middle">
        <StatusSwitch
          value={row.isActive}
          onChange={(nextValue) => onToggle(row, nextValue)}
        />
      </td>

      <td className="px-5 py-5 align-middle">
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => onEdit(row)}
            className="text-gray hover:text-primary"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled
            className="cursor-not-allowed text-gray/40"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
