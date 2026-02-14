import Image from "next/image";
import Button from "@/components/buttons/button";
import { User } from "@/app/(dashboard)/admin/types/user-lists-types";
import { useRouter } from "next/navigation";

const statusChip: Record<
  User["verificationStatus"],
  { label: string; className: string }
> = {
  pending: { label: "Pending", className: "bg-[#fff7ed] text-[#c2410c]" }, // orange-ish
  verified: {
    label: "Verified",
    className: "bg-secondary text-green border border-gray/10",
  },
  unverified: {
    label: "Unverified",
    className: "bg-secondary text-gray border border-gray/10",
  },
};

function initials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function UserListTable({
  rows,
  total,
  page,
  totalPages,
  start,
  end,
  onPageChange,
}: {
  rows: User[];
  total: number;
  page: number;
  totalPages: number;
  start: number;
  end: number;
  onPageChange: (p: number) => void;
}) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray/15 overflow-x-auto">
      <table className="w-full text-sm min-w-242">
        <thead className="bg-secondary/50 text-gray text-xs uppercase">
          <tr>
            <th className="p-4 text-left">Profile</th>
            <th className="p-4 text-left">User ID</th>
            <th className="p-4 text-left">Phone Number</th>
            <th className="p-4 text-left">Verification Status</th>
            <th className="p-4 text-left">Activity Stats</th>
            <th className="p-4 text-left">Joined Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((u) => (
            <tr
              key={u.id}
              className="border-t border-t-gray/15 hover:bg-secondary/40"
            >
              {/* profile */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary border border-gray/10 flex items-center justify-center">
                    {u.profile.avatarImage ? (
                      <Image
                        src={u.profile.avatarImage}
                        alt={u.profile.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-primary">
                        {u.profile.avatarText ?? initials(u.profile.name)}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-black">{u.profile.name}</p>
                    <p className="text-sm text-gray">{u.profile.email}</p>
                  </div>
                </div>
              </td>

              {/* user id */}
              <td className="p-4">
                <span className="text-primary font-medium">{u.userId}</span>
              </td>

              {/* phone */}
              <td className="p-4 text-gray">{u.phone}</td>

              {/* verification */}
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusChip[u.verificationStatus].className}`}
                >
                  {statusChip[u.verificationStatus].label}
                </span>
              </td>

              {/* activity */}
              <td className="p-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-black font-medium">
                    {u.activity.sold}
                  </span>
                  <span className="text-gray">Sold</span>
                  <span className="text-gray">|</span>
                  <span className="text-black font-medium">
                    {u.activity.bought}
                  </span>
                  <span className="text-gray">Bought</span>
                </div>
              </td>

              {/* joined */}
              <td className="p-4 text-gray">{u.joinedDate}</td>

              {/* actions */}
              <td className="p-4">
                {u.verificationStatus === "pending" ? (
                  <Button size="base">Verify Identity</Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="base"
                    onClick={() => router.push(`/admin/users/details/${u.id}`)}
                  >
                    View Profile
                  </Button>
                )}
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr className="border-t border-t-gray/15">
              <td colSpan={7} className="p-6 text-center text-gray">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* pagination (same style as earlier) */}
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
