import StatusSwitch from "@/app/(dashboard)/admin/(pages)/manage/_components/status-switch";
import {
  AgentRoleIconKey,
  AgentRoleRow,
  BadgeColorKey,
} from "@/app/(dashboard)/admin/types/agent-role.types";
import {
  Edit3,
  Trash2,
  Scale,
  Ruler,
  FilePenLine,
  Users,
  Landmark,
  Key,
  FileText,
  Settings,
  Briefcase,
  HardHat,
} from "lucide-react";

function badgeBg(color: BadgeColorKey) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

function RoleIcon({ k }: { k: AgentRoleIconKey }) {
  const cls = "h-4 w-4";
  if (k === "legal") return <Scale className={cls} />;
  if (k === "survey") return <Ruler className={cls} />;
  if (k === "deed") return <FilePenLine className={cls} />;
  if (k === "field") return <Users className={cls} />;
  if (k === "finance") return <Landmark className={cls} />;
  if (k === "home") return <Landmark className={cls} />;
  if (k === "key") return <Key className={cls} />;
  if (k === "doc") return <FileText className={cls} />;
  if (k === "gear") return <Settings className={cls} />;
  if (k === "bag") return <Briefcase className={cls} />;
  if (k === "helmet") return <HardHat className={cls} />;
  return <Users className={cls} />;
}

export default function AgentRolesTable({
  rows,
  onToggle,
  onEdit,
  onDelete,
}: {
  rows: AgentRoleRow[];
  onToggle: (id: string, v: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary/20 border-b border-gray/10">
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[16%]">
              VISUAL IDENTITY
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[22%]">
              ROLE NAME
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[16%]">
              SHORT CODE
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              DESCRIPTION
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
              {/* visual identity */}
              <td className="px-5 py-5 align-middle">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${badgeBg(r.badgeColor)}`}
                  >
                    <RoleIcon k={r.icon} />
                  </div>
                </div>
              </td>

              {/* role name */}
              <td className="px-5 py-5 align-middle">
                <p className="text-sm font-semibold text-primary">
                  {r.roleName}
                </p>
              </td>

              {/* short code */}
              <td className="px-5 py-5 align-middle">
                <span className="inline-flex rounded-md bg-gray/10 px-3 py-1 text-xs font-semibold">
                  {r.shortCode}
                </span>
              </td>

              {/* description */}
              <td className="px-5 py-5 align-middle">
                <p className="text-sm font-medium text-gray">{r.description}</p>
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
