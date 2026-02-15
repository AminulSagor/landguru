import StatusSwitch from "@/app/(dashboard)/admin/(pages)/manage/_components/status-switch";
import { LandTypeRow } from "@/app/(dashboard)/admin/types/land-type.types";
import {
  Edit3,
  Trash2,
  Tractor,
  Mountain,
  Waves,
  Building2,
  Home,
  Store,
} from "lucide-react";

function Icon({ k }: { k: LandTypeRow["icon"] }) {
  const cls = "h-5 w-5";
  if (k === "tractor") return <Tractor className={cls} />;
  if (k === "mountain") return <Mountain className={cls} />;
  if (k === "waves") return <Waves className={cls} />;
  if (k === "building") return <Building2 className={cls} />;
  if (k === "house") return <Home className={cls} />;
  return <Store className={cls} />;
}

function badgeBg(color: LandTypeRow["badgeColor"]) {
  // screenshot colors (hex) allowed
  if (color === "blue") return "bg-[#DBEAFE] text-[#1D4ED8]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  return "bg-secondary text-gray";
}

export default function LandTypesTable({
  rows,
  onToggle,
  onEdit,
  onDelete,
}: {
  rows: LandTypeRow[];
  onToggle: (id: string, v: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary/20 border-b border-gray/10">
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[10%]">
              ICON
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              TYPE NAME
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[18%]">
              CREATED
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[12%]">
              STATUS
            </th>
            <th className="px-5 py-4 text-right text-[11px] font-semibold tracking-widest text-gray w-[10%]">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-gray/10 bg-white">
              {/* icon */}
              <td className="px-5 py-5 align-middle">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${badgeBg(r.badgeColor)}`}
                >
                  <Icon k={r.icon} />
                </div>
              </td>

              {/* type name */}
              <td className="px-5 py-5 align-middle">
                <p className="text-sm font-semibold text-primary">
                  {r.typeName}
                </p>
                <p className="text-sm font-medium text-gray">{r.subtitle}</p>
              </td>

              {/* created */}
              <td className="px-5 py-5 align-middle">
                <p className="text-sm font-medium text-gray">{r.createdAt}</p>
              </td>

              {/* status */}
              <td className="px-5 py-5 align-middle">
                <StatusSwitch
                  value={r.isActive}
                  onChange={(v) => onToggle(r.id, v)}
                />
              </td>

              {/* actions */}
              <td className="px-5 py-5 align-middle">
                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => onEdit(r.id)}
                    className="text-gray hover:text-primary"
                    aria-label="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(r.id)}
                    className="text-gray hover:text-primary"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
