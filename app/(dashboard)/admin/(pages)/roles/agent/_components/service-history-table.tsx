import Image from "next/image";
import Button from "@/components/buttons/button";
import { CompletedServiceItem } from "@/app/(dashboard)/admin/types/agent-completed-service-types";

const serviceTypeMeta: Record<
  CompletedServiceItem["serviceType"],
  { label: string; className: string }
> = {
  legal_verification: {
    label: "Legal Verification",
    className: "bg-secondary text-primary border border-gray/10",
  },
  doc_review: {
    label: "Doc Review",
    className: "bg-secondary text-primary border border-gray/10",
  },
  title_search: {
    label: "Title Search",
    className: "bg-secondary text-primary border border-gray/10",
  },
};

const payoutMeta: Record<
  CompletedServiceItem["payoutStatus"],
  { label: string; className: string; dotClass: string }
> = {
  paid: {
    label: "Paid",
    className: "bg-secondary text-green border border-gray/10",
    dotClass: "bg-green",
  },
  processing: {
    label: "Processing",
    className: "bg-secondary text-primary border border-gray/10",
    dotClass: "bg-primary",
  },
};

function formatBDT(amount: number) {
  return `৳ ${amount.toLocaleString("en-US")}`;
}

export default function ServiceHistoryTable({
  rows,
  total,
  page,
  totalPages,
  start,
  end,
  onPageChange,
}: {
  rows: CompletedServiceItem[];
  total: number;
  page: number;
  totalPages: number;
  start: number;
  end: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray/15 overflow-x-auto">
      <table className="w-full text-sm min-w-242">
        <thead className="bg-secondary text-gray text-xs uppercase">
          <tr>
            <th className="p-4 text-left">Service ID</th>
            <th className="p-4 text-left">Property Post</th>
            <th className="p-4 text-left">Service Type</th>
            <th className="p-4 text-left">Completion Date</th>
            <th className="p-4 text-left">Payout Status</th>
            <th className="p-4 text-left">Earned Amount</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-t-gray/15 hover:bg-secondary"
            >
              <td className="p-4 text-gray">{row.serviceId}</td>

              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg overflow-hidden border border-gray/10 bg-secondary">
                    <Image
                      src={row.property.image}
                      alt={row.property.title}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-black">
                      {row.property.title}
                    </p>
                    <p className="text-xs text-gray">
                      ID: {row.property.postId}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    serviceTypeMeta[row.serviceType]?.className ??
                    "bg-secondary text-gray border border-gray/10"
                  }`}
                >
                  {serviceTypeMeta[row.serviceType]?.label ?? row.serviceType}
                </span>
              </td>

              <td className="p-4 text-gray">{row.completionDate}</td>

              <td className="p-4">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                    payoutMeta[row.payoutStatus]?.className ??
                    "bg-secondary text-gray border border-gray/10"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      payoutMeta[row.payoutStatus]?.dotClass ?? "bg-gray"
                    }`}
                  />
                  {payoutMeta[row.payoutStatus]?.label ?? row.payoutStatus}
                </span>
              </td>

              <td className="p-4 font-semibold text-black">
                {formatBDT(row.earnedAmount)}
              </td>

              <td className="p-4">
                <Button
                  variant="secondary"
                  className="h-9 px-3 text-sm bg-white border border-gray/15 hover:bg-secondary"
                  onClick={() => alert("View Report (static)")}
                >
                  View Report
                </Button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr className="border-t border-t-gray/15">
              <td className="p-6 text-center text-gray" colSpan={7}>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray/15 text-sm">
        <p className="text-gray">
          Showing {total === 0 ? 0 : start + 1} to {Math.min(end, total)} of{" "}
          {total} results
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border border-gray/15 text-gray disabled:opacity-40 hover:bg-secondary"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            const active = p === page;

            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 rounded-md border border-gray/15 ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "text-gray hover:bg-secondary"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border border-gray/15 text-gray disabled:opacity-40 hover:bg-secondary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
