import LocationRow from "@/app/(dashboard)/admin/(pages)/manage/_components/location-row";
import type { OperationalZoneItem } from "@/types/admin/manage/locations/operational-zones-list.types";

export default function LocationsTable({
  rows,
  onToggle,
  onEdit,
  isLoading = false,
}: {
  rows: OperationalZoneItem[];
  onToggle: (row: OperationalZoneItem, v: boolean) => void;
  onEdit: (row: OperationalZoneItem) => void;
  isLoading?: boolean;
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
          {isLoading ? (
            <tr className="bg-white">
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray">
                Loading operational zones...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr className="bg-white">
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray">
                No operational zones found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <LocationRow
                key={row.id}
                row={row}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
