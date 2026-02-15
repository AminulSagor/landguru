import StatusSwitch from "@/app/(dashboard)/admin/(pages)/manage/_components/status-switch";
import {
  BadgeColorKey,
  ManageServiceType,
  ServiceIconKey,
} from "@/app/(dashboard)/admin/types/manage-service-type";
import {
  Edit3,
  Trash2,
  FileCheck2,
  Map,
  Ruler,
  FilePenLine,
  Folder,
  BadgeCheck,
  FileUp,
  Shield,
  Package,
} from "lucide-react";

function badgeBg(color: BadgeColorKey) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  if (color === "indigo") return "bg-[#E0E7FF] text-[#3730A3]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

function Icon({ k }: { k: ServiceIconKey }) {
  const cls = "h-4 w-4";
  if (k === "doc-check") return <FileCheck2 className={cls} />;
  if (k === "map") return <Map className={cls} />;
  if (k === "ruler") return <Ruler className={cls} />;
  if (k === "doc-pen") return <FilePenLine className={cls} />;
  if (k === "folder") return <Folder className={cls} />;
  if (k === "badge-check") return <BadgeCheck className={cls} />;
  if (k === "file-up") return <FileUp className={cls} />;
  if (k === "shield") return <Shield className={cls} />;
  return <Package className={cls} />;
}

export default function ServiceRow({
  row,
  onToggle,
  onEdit,
  onDelete,
}: {
  row: ManageServiceType;
  onToggle: (id: string, v: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b border-gray/10 bg-white">
      {/* SERVICE NAME */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ${badgeBg(
              row.badgeColor,
            )}`}
          >
            <Icon k={row.icon} />
          </div>

          <p className="text-sm">{row.name}</p>
        </div>
      </td>

      {/* DESCRIPTION */}
      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-medium text-gray">{row.description}</p>
      </td>

      {/* DATE */}
      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-medium text-gray">{row.createdAt}</p>
      </td>

      {/* STATUS */}
      <td className="px-5 py-5 align-middle">
        <StatusSwitch
          value={row.isActive}
          onChange={(v) => onToggle(row.id, v)}
        />
      </td>

      {/* ACTIONS */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => onEdit(row.id)}
            className="text-gray hover:text-primary"
            aria-label="Edit"
          >
            <Edit3 className="h-4 w-4" />
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
