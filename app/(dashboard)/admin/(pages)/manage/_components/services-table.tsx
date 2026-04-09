import ServiceRow from "@/app/(dashboard)/admin/(pages)/manage/_components/service-row";
import type { ServiceTypeItem } from "@/types/admin/manage/services/service-types-list.types";

export default function ServicesTable({
  rows,
  onToggle,
  onEdit,
  onDelete,
  isLoading = false,
}: {
  rows: ServiceTypeItem[];
  onToggle: (row: ServiceTypeItem, value: boolean) => void;
  onEdit: (row: ServiceTypeItem) => void;
  onDelete: (row: ServiceTypeItem) => void;
  isLoading?: boolean;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary/20 border-b border-gray/10">
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[42%]">
              SERVICE NAME
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[28%]">
              DESCRIPTION
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[16%]">
              CREATION DATE
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[8%]">
              STATUS
            </th>
            <th className="px-5 py-4 text-right text-[11px] font-semibold tracking-widest text-gray w-[6%]">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr className="bg-white">
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray">
                Loading service types...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr className="bg-white">
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray">
                No service types found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <ServiceRow
                key={row.id}
                row={row}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
