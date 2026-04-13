import {
  Briefcase,
  Edit3,
  FilePenLine,
  FileText,
  Gavel,
  HardHat,
  Home,
  Key,
  Landmark,
  Ruler,
  Settings,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import StatusSwitch from "@/app/(dashboard)/admin/(pages)/manage/_components/status-switch";
import type {
  AgentRoleBadgeColor,
  AgentRoleIconKey,
  AgentRoleItem,
} from "@/types/admin/manage/agent-roles/agent-roles-list.types";

function badgeBg(color: AgentRoleBadgeColor) {
  if (color === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (color === "orange") return "bg-[#FFE8D6] text-[#9A3412]";
  if (color === "teal") return "bg-[#DFF7F2] text-[#0F766E]";
  if (color === "green") return "bg-[#DCFCE7] text-[#166534]";
  if (color === "red") return "bg-[#FEE2E2] text-[#991B1B]";
  if (color === "indigo") return "bg-[#E0E7FF] text-[#3730A3]";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

function RoleIcon({ iconKey }: { iconKey: AgentRoleIconKey }) {
  const className = "h-4 w-4";

  if (iconKey === "icon-gavel") return <Gavel className={className} />;
  if (iconKey === "icon-ruler") return <Ruler className={className} />;
  if (iconKey === "icon-file-pen-line") {
    return <FilePenLine className={className} />;
  }
  if (iconKey === "icon-users") return <Users className={className} />;
  if (iconKey === "icon-landmark") return <Landmark className={className} />;
  if (iconKey === "icon-key") return <Key className={className} />;
  if (iconKey === "icon-file-text") return <FileText className={className} />;
  if (iconKey === "icon-settings") return <Settings className={className} />;
  if (iconKey === "icon-briefcase") {
    return <Briefcase className={className} />;
  }
  if (iconKey === "icon-hard-hat") return <HardHat className={className} />;
  if (iconKey === "icon-home") return <Home className={className} />;
  if (iconKey === "icon-user-round") {
    return <UserRound className={className} />;
  }

  return <Users className={className} />;
}

export default function AgentRolesTable({
  rows,
  onToggle,
  onEdit,
  onDelete,
  isLoading = false,
}: {
  rows: AgentRoleItem[];
  onToggle: (row: AgentRoleItem, value: boolean) => void;
  onEdit: (row: AgentRoleItem) => void;
  onDelete: (row: AgentRoleItem) => void;
  isLoading?: boolean;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray/10 bg-secondary/20">
            <th className="w-[16%] px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              VISUAL IDENTITY
            </th>
            <th className="w-[22%] px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              ROLE NAME
            </th>
            <th className="w-[16%] px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              SHORT CODE
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              DESCRIPTION
            </th>
            <th className="w-[12%] px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              STATUS
            </th>
            <th className="w-[10%] px-5 py-4 text-right text-[11px] font-semibold tracking-widest text-gray">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr className="bg-white">
              <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray">
                Loading agent roles...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr className="bg-white">
              <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray">
                No agent roles found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-gray/10 bg-white">
                <td className="px-5 py-5 align-middle">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${badgeBg(
                        row.badgeColor,
                      )}`}
                    >
                      <RoleIcon iconKey={row.icon} />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-5 align-middle">
                  <p className="text-sm font-semibold text-primary">{row.name}</p>
                </td>

                <td className="px-5 py-5 align-middle">
                  <span className="inline-flex rounded-md bg-gray/10 px-3 py-1 text-xs font-semibold">
                    {row.shortCode}
                  </span>
                </td>

                <td className="px-5 py-5 align-middle">
                  <p className="text-sm font-medium text-gray">{row.description}</p>
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
