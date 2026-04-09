import {
  BadgeCheck,
  Edit3,
  FileCheck2,
  FilePenLine,
  FileUp,
  Folder,
  Map,
  Package,
  Ruler,
  Shield,
  Trash2,
  User,
} from "lucide-react";

import StatusSwitch from "@/app/(dashboard)/admin/(pages)/manage/_components/status-switch";
import type {
  ServiceTypeBadgeColor,
  ServiceTypeIconKey,
  ServiceTypeItem,
} from "@/types/admin/manage/services/service-types-list.types";

function badgeBg(color: ServiceTypeBadgeColor) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  if (color === "indigo") return "bg-[#E0E7FF] text-[#3730A3]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

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

function ServiceIcon({ iconKey }: { iconKey: ServiceTypeIconKey }) {
  const className = "h-4 w-4";

  if (iconKey === "icon-map") return <Map className={className} />;
  if (iconKey === "icon-ruler") return <Ruler className={className} />;
  if (iconKey === "icon-doc-pen") return <FilePenLine className={className} />;
  if (iconKey === "icon-folder") return <Folder className={className} />;
  if (iconKey === "icon-badge-check") return <BadgeCheck className={className} />;
  if (iconKey === "icon-file-up") return <FileUp className={className} />;
  if (iconKey === "icon-shield") return <Shield className={className} />;
  if (iconKey === "icon-package") return <Package className={className} />;
  if (iconKey === "icon-man") return <User className={className} />;

  return <FileCheck2 className={className} />;
}

export default function ServiceRow({
  row,
  onToggle,
  onEdit,
  onDelete,
}: {
  row: ServiceTypeItem;
  onToggle: (row: ServiceTypeItem, value: boolean) => void;
  onEdit: (row: ServiceTypeItem) => void;
  onDelete: (row: ServiceTypeItem) => void;
}) {
  return (
    <tr className="border-b border-gray/10 bg-white">
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ${badgeBg(
              row.badgeColor,
            )}`}
          >
            <ServiceIcon iconKey={row.icon} />
          </div>

          <p className="text-sm">{row.name}</p>
        </div>
      </td>

      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-medium text-gray">{row.description}</p>
      </td>

      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-medium text-gray">
          {formatCreatedAt(row.createdAt)}
        </p>
      </td>

      <td className="px-5 py-5 align-middle">
        <StatusSwitch
          value={row.isActive}
          onChange={(value) => onToggle(row, value)}
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
            <Edit3 className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(row)}
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
