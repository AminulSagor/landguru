"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ImageOff } from "lucide-react";
import { agentListService } from "@/service/admin/agent/agent-list.service";
import { agentStatusService } from "@/service/admin/agent/agent-status.service";
import type {
  AgentListItem,
  AgentSortOrder,
  AgentType,
} from "@/types/admin/agent-list/agent-list.types";

const roleColor: Record<string, string> = {
  surveyor: "bg-orange-100 text-orange-700",
  lawyer: "bg-blue-100 text-blue-700",
  field_assistant: "bg-green-100 text-green-700",
  deed_writer: "bg-teal-100 text-teal-700",
  Surveyor: "bg-orange-100 text-orange-700",
  Lawyer: "bg-blue-100 text-blue-700",
  "Field Assistant": "bg-green-100 text-green-700",
  "Deed Writer": "bg-teal-100 text-teal-700",
};

const PAGE_SIZE = 10;

const formatRoleLabel = (role: string) => {
  if (!role) return "-";

  return role
    .split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
};

interface AgentListsProps {
  agentType: AgentType | "";
  sort: AgentSortOrder;
}

interface AgentAvatarProps {
  src?: string;
  alt: string;
}

const AgentAvatar = ({ src, alt }: AgentAvatarProps) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src?.trim() || hasError) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray/15 bg-gray-100 text-gray-400">
        <ImageOff className="h-4 w-4" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="h-10 w-10 rounded-full object-cover"
      onError={() => setHasError(true)}
    />
  );
};

const AgentLists = ({ agentType, sort }: AgentListsProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
  const [pendingAgentId, setPendingAgentId] = React.useState<string | null>(
    null,
  );

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["admin-agent-list", agentType, sort],
    queryFn: ({ pageParam = 1 }) =>
      agentListService.getAdminAgentList({
        page: pageParam,
        limit: PAGE_SIZE,
        agentType: agentType || undefined,
        sort,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta.page;
      const totalPages = lastPage.meta.totalPages;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const { mutate: updateAgentStatus } = useMutation({
    mutationFn: ({
      agentId,
      isActive,
    }: {
      agentId: string;
      isActive: boolean;
    }) => agentStatusService.updateAdminAgentStatus(agentId, { isActive }),
    onMutate: ({ agentId }) => {
      setPendingAgentId(agentId);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["admin-agent-list"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["admin-agent-summary"],
        }),
      ]);
    },
    onSettled: () => {
      setPendingAgentId(null);
    },
  });

  React.useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const rows: AgentListItem[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  const total = data?.pages[0]?.meta.total ?? 0;

  const handleStatusToggle = (
    event: React.MouseEvent<HTMLButtonElement>,
    agent: AgentListItem,
  ) => {
    event.stopPropagation();

    if (pendingAgentId === agent.id) return;

    updateAgentStatus({
      agentId: agent.id,
      isActive: !agent.isActive,
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray/20 bg-white shadow-sm">
      <table className="min-w-242 w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray">
          <tr>
            <th className="w-10 p-4 text-left">
              <input type="checkbox" />
            </th>
            <th className="p-4 text-left">Profile</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Assigned Zone</th>
            <th className="p-4 text-left">Contact</th>
            <th className="p-4 text-left">Performance</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8} className="p-6 text-center text-gray-500">
                Loading agents...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-6 text-center text-gray-500">
                No agents found
              </td>
            </tr>
          ) : (
            rows.map((agent) => {
              const isStatusUpdating = pendingAgentId === agent.id;

              return (
                <tr
                  key={agent.id}
                  className="cursor-pointer border-t border-t-gray/20 hover:bg-gray-50"
                  onClick={() =>
                    router.push(`/admin/roles/agent/details/${agent.id}`)
                  }
                >
                  <td
                    className="p-4"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div>
                      <input type="checkbox" />
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <AgentAvatar
                        src={agent.profile.photoUrl}
                        alt={agent.profile.name}
                      />

                      <div>
                        <p className="font-medium text-gray-800">
                          {agent.profile.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {agent.profile.displayId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        roleColor[agent.role] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {formatRoleLabel(agent.role)}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">{agent.assignedZone}</td>
                  <td className="p-4 text-gray-600">{agent.contact}</td>

                  <td className="p-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      {agent.performance}
                    </span>
                  </td>

                  <td
                    className="p-4"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={(event) => handleStatusToggle(event, agent)}
                      disabled={isStatusUpdating}
                      aria-label={
                        agent.isActive ? "Suspend agent" : "Activate agent"
                      }
                      className={`relative h-5 w-10 rounded-full transition ${
                        agent.isActive ? "bg-green-500" : "bg-gray-300"
                      } ${isStatusUpdating ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      <div
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                          agent.isActive ? "right-0.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </td>

                  <td
                    className="p-4"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button className="text-gray-400 hover:text-gray-700">
                      ✏️
                    </button>
                  </td>
                </tr>
              );
            })
          )}

          {!isLoading && rows.length > 0 && (
            <tr>
              <td colSpan={8} className="p-4 text-center text-sm text-gray-500">
                {isFetchingNextPage
                  ? "Loading more agents..."
                  : rows.length >= total
                    ? `Showing all ${total} agents`
                    : `Showing ${rows.length} of ${total} agents`}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div ref={loadMoreRef} className="h-2 w-full" />

      {isFetching && !isLoading && !isFetchingNextPage ? (
        <div className="px-4 pb-4 text-sm text-gray-500">Refreshing...</div>
      ) : null}
    </div>
  );
};

export default AgentLists;