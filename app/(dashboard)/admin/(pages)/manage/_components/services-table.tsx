import ServiceRow from "@/app/(dashboard)/admin/(pages)/manage/_components/service-row";
import { ManageServiceType } from "@/app/(dashboard)/admin/types/manage-service-type";

export default function ServicesTable({
  rows,
  onToggle,
  onEdit,
  onDelete,
}: {
  rows: ManageServiceType[];
  onToggle: (id: string, v: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
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
          {rows.map((row) => (
            <ServiceRow
              key={row.id}
              row={row}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
