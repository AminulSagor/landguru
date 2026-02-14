"use client";

import UserListTable from "@/app/(dashboard)/admin/(pages)/users/_components/user-list-table";
import UserManagementFilters from "@/app/(dashboard)/admin/(pages)/users/_components/user-management-filters";
import UserManagementStatsRow from "@/app/(dashboard)/admin/(pages)/users/_components/user-management-stats-row";
import {
  userManagementStats,
  users,
} from "@/app/(dashboard)/admin/dummy-data/user-list-data";
import {
  User,
  VerificationStatus,
} from "@/app/(dashboard)/admin/types/user-lists-types";
import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

export default function UserManagementPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | VerificationStatus>("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let rows: User[] = users.filter((u) => {
      const matchesQ =
        !q ||
        u.profile.name.toLowerCase().includes(q) ||
        u.profile.email.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q);

      const matchesStatus =
        status === "all" ? true : u.verificationStatus === status;
      return matchesQ && matchesStatus;
    });

    rows = rows.sort((a, b) => {
      const da = new Date(a.joinedDate).getTime();
      const db = new Date(b.joinedDate).getTime();
      return sort === "newest" ? db - da : da - db;
    });

    return rows;
  }, [query, status, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentData = filtered.slice(start, end);

  if (page > totalPages) setPage(totalPages);

  return (
    <div className="space-y-4">
      <UserManagementStatsRow stats={userManagementStats} />

      <UserManagementFilters
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setPage(1);
        }}
        status={status}
        onStatusChange={(v) => {
          setStatus(v);
          setPage(1);
        }}
        sort={sort}
        onSortChange={(v) => {
          setSort(v);
          setPage(1);
        }}
      />

      <UserListTable
        rows={currentData}
        total={total}
        page={page}
        totalPages={totalPages}
        start={start}
        end={end}
        onPageChange={setPage}
      />
    </div>
  );
}
