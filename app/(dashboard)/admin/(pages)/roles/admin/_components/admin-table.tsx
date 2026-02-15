import AdminRowItem from "@/app/(dashboard)/admin/(pages)/roles/admin/_components/admin-row";
import { AdminRow } from "@/app/(dashboard)/admin/types/admin-list-type";

export default function AdminTable({
  rows,
  selectedIds,
  allVisibleSelected,
  onToggleAll,
  onToggleOne,
  onToggleAccount,
  onEdit,
  onKey,
  onDelete,
}: {
  rows: AdminRow[];
  selectedIds: string[];
  allVisibleSelected: boolean;
  onToggleAll: () => void;
  onToggleOne: (id: string) => void;
  onToggleAccount: (id: string, v: boolean) => void;
  onEdit: (id: string) => void;
  onKey: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary/20 border-b border-gray/10">
            <th className="px-5 py-4 w-[44px]">
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={onToggleAll}
              />
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              ADMIN PROFILE
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              ASSIGNED LOCATION
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              CONTACT INFO
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              WORKFORCE SUPERVISION
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              ACTIVITY STATUS
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray">
              ACCOUNT
            </th>
            <th className="px-5 py-4 text-right text-[11px] font-semibold tracking-widest text-gray">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <AdminRowItem
              key={r.id}
              row={r}
              selected={selectedIds.includes(r.id)}
              onToggle={() => onToggleOne(r.id)}
              onToggleAccount={(v) => onToggleAccount(r.id, v)}
              onEdit={() => onEdit(r.id)}
              onKey={() => onKey(r.id)}
              onDelete={() => onDelete(r.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
