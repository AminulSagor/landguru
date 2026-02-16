import { AdminRow } from "@/app/(dashboard)/admin/types/admin-list-type";
import { IMAGE } from "@/constants/image-paths";
import { Edit3, KeyRound, Trash2 } from "lucide-react";
import Image from "next/image";

function locationChip(tone: AdminRow["locationTone"]) {
  if (tone === "purple") return "bg-[#F3E8FF] text-[#6D28D9]";
  if (tone === "gray") return "bg-secondary text-gray";
  return "bg-[#DBEAFE] text-[#1D4ED8]";
}

export default function AdminRowItem({
  row,
  selected,
  onToggle,
  onToggleAccount,
  onEdit,
  onKey,
  onDelete,
  onClick,
}: {
  row: AdminRow;
  selected: boolean;
  onToggle: () => void;
  onToggleAccount: (v: boolean) => void;
  onEdit: () => void;
  onKey: () => void;
  onDelete: () => void;
  onClick: () => void;
}) {
  const initials = row.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const onlineDot =
    row.activityStatus === "online"
      ? "bg-green"
      : row.activityStatus === "offline"
        ? "bg-gray"
        : "bg-[#EF4444]"; // screenshot red

  const activityText =
    row.activityStatus === "online"
      ? "Online"
      : row.activityStatus === "offline"
        ? "Offline"
        : "Suspended";

  const activityColor =
    row.activityStatus === "online"
      ? "text-primary"
      : row.activityStatus === "offline"
        ? "text-gray"
        : "text-[#EF4444]";

  return (
    <tr className="border-b border-gray/10 bg-white" onClick={onClick}>
      <td className="px-5 py-5 align-middle">
        <input type="checkbox" checked={selected} onChange={onToggle} />
      </td>

      {/* profile */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-secondary flex items-center justify-center overflow-hidden">
            <Image
              src={IMAGE.avatar}
              height={35}
              width={35}
              alt="admin-image"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">{row.name}</p>
            <p className="text-xs font-medium text-gray">{row.id}</p>
          </div>
        </div>
      </td>

      {/* location */}
      <td className="px-5 py-5 align-middle">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${locationChip(row.locationTone)}`}
        >
          {row.assignedLocation}
        </span>
      </td>

      {/* contact */}
      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-semibold text-primary">{row.phone}</p>
        <p className="text-xs font-medium text-gray">{row.email}</p>
      </td>

      {/* workforce */}
      <td className="px-5 py-5 align-middle">
        <p className="text-sm font-semibold text-primary">
          <span className="text-primary underline">
            {row.workforceCount} Agents
          </span>
        </p>
        <p className="text-xs font-medium text-gray">
          {row.workforceActive} Active,{" "}
          <span
            className={
              row.workforceSuspended > 0 ? "text-[#EF4444]" : "text-gray"
            }
          >
            {row.workforceSuspended} Suspended
          </span>
        </p>
      </td>

      {/* activity */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${onlineDot}`} />
          <p className={`text-sm font-semibold ${activityColor}`}>
            {activityText}
          </p>
        </div>
        <p className="text-xs font-medium text-gray">{row.lastLoginText}</p>
      </td>

      {/* account switch */}
      <td className="px-5 py-5 align-middle">
        <button
          type="button"
          onClick={() => onToggleAccount(!row.accountEnabled)}
          className={[
            "relative h-5 w-10 rounded-full transition-all",
            row.accountEnabled
              ? "bg-primary"
              : "bg-secondary border border-gray/20",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all shadow-xs",
              row.accountEnabled ? "left-5" : "left-0.5",
            ].join(" ")}
          />
        </button>
      </td>

      {/* actions */}
      <td className="px-5 py-5 align-middle">
        <div className="flex items-center justify-end gap-4">
          <button
            className="text-gray hover:text-primary"
            onClick={onEdit}
            aria-label="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            className="text-gray hover:text-primary"
            onClick={onKey}
            aria-label="Key"
          >
            <KeyRound className="h-4 w-4" />
          </button>
          <button
            className="text-[#EF4444]"
            onClick={onDelete}
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
