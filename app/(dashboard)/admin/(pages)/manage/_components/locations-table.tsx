import LocationRow from "@/app/(dashboard)/admin/(pages)/manage/_components/location-row";
import { ManageZoneRow } from "@/app/(dashboard)/admin/types/manage-location.types";

export default function LocationsTable({
  rows,
  onToggle,
  onEdit,
  onDelete,
}: {
  rows: ManageZoneRow[];
  onToggle: (id: string, v: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white border-b border-gray/10">
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[26%]">
              ZONE NAME
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[36%]">
              PARENT REGION
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[18%]">
              CREATION DATE
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-gray w-[10%]">
              STATUS
            </th>
            <th className="px-5 py-4 text-right text-[11px] font-semibold tracking-widest text-gray w-[10%]">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <LocationRow
              key={r.id}
              row={r}
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
