"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ServiceRequestsOverview from "./_components/service-requests-overview";
import ServiceRequestsToolbar from "./_components/service-requests-toolbar";
import ServiceRequestsTable from "./_components/service-requests-table";
import ServiceDetailsDialog from "./_components/service-details-dialog";
import AssignAgentDialog from "./_components/assign-agent-dialog";

import { serviceRequestsListService } from "@/service/admin/service-requests/service-requests-list.service";
import { serviceRequestsSummaryService } from "@/service/admin/service-requests/service-requests-summary.service";
import { serviceRequestAssignmentService } from "@/service/admin/service-requests/service-request-assignment.service";
import { serviceRequestPostDetailService } from "@/service/admin/service-requests/service-request-post-detail.service";
import type {
  ServiceRequestListItem,
  ServiceRequestListQueryParams,
  ServiceRequestStatus,
} from "@/types/admin/service-requests/service-requests-list.types";
import type { ServiceRequestsSummaryData } from "@/types/admin/service-requests/service-requests-summary.types";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";
import type { AvailableAgentItem } from "@/types/admin/service-requests/service-request-assignment.types";
import type {
  ServiceRequestReviewDeliverable,
  ServiceRequestReviewResponse,
} from "@/types/admin/service-requests/service-request-review.types";
import { formatDisplayIdSafe } from "@/utils/id.utils";

import type { AssignAgentDialogPayload, AssignAgentDocument, AssignAgentSubmitPayload } from "@/app/(dashboard)/admin/types/assign-agent.types";
import type { ServiceDetails } from "@/app/(dashboard)/admin/types/service-request.types";

const DEFAULT_SUMMARY: ServiceRequestsSummaryData = {
  totalRequests: 0,
  unassigned: 0,
  inReview: 0,
  totalCompleted: 0,
  completedToday: 0,
};

const SEARCH_DEBOUNCE_MS = 350;

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: { data?: { message?: string } } }).response?.data
      ?.message
  ) {
    return (
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message ?? "Something went wrong"
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong";
}

function buildOptions(values: string[]): Array<{ label: string; value: string }> {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean)),
  )
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ label: value, value }));
}

function normalizeStatus(value: string): ServiceRequestStatus | "" {
  if (!value || value === "all") {
    return "";
  }

  return value as ServiceRequestStatus;
}

function normalizeServiceType(value: string): string {
  if (!value || value === "all") {
    return "";
  }

  return value;
}

function mapSortToApi(sort: string): ServiceRequestListQueryParams["sort"] {
  return sort === "oldest" ? "ASC" : "DESC";
}

function mapDocType(fileName: string): AssignAgentDocument["type"] {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext === "pdf" ? "pdf" : "docx";
}

function getFileName(fileUrl: string): string {
  const safeUrl = fileUrl.split("?")[0] ?? fileUrl;
  const segments = safeUrl.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "document";
}

function resolveZoneLabel(post: PropertyPostItem): string {
  const chunks = [
    post.upazila,
    post.district,
    post.division,
    post.address?.upazila,
    post.address?.district,
    post.address?.division,
  ]
    .map((value) => value?.trim())
    .filter(Boolean) as string[];

  if (chunks.length > 0) {
    return Array.from(new Set(chunks)).join(", ");
  }

  return post.fullAddress || post.address?.fullAddress || "Location unavailable";
}

function getDocuments(
  post: PropertyPostItem,
  providedUrls?: string[] | null,
): AssignAgentDocument[] {
  const baseUrls =
    providedUrls !== null && providedUrls !== undefined
      ? providedUrls
      : [
          ...(post.documents?.map((item) => item.fileUrl) ?? []),
          ...(post.deedFiles ?? []),
          ...(post.khatianFiles ?? []),
          ...(post.otherFiles ?? []),
        ];

  const urls = baseUrls.filter(Boolean) as string[];

  return Array.from(new Set(urls)).map((url, index) => {
    const fileName = getFileName(url);
    return {
      id: `doc-${index + 1}`,
      fileName,
      fileUrl: url,
      type: mapDocType(fileName),
      selected: true,
    };
  });
}

function toTone(activeJobsLabel: string): "green" | "orange" | "primary" {
  const normalized = activeJobsLabel.toLowerCase();
  if (normalized.includes("low")) return "green";
  if (normalized.includes("high")) return "orange";
  return "primary";
}

function toDisplayDate(value?: string | null): string {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function toDisplayDateTime(value?: string | null): string {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function getLastActiveLabel(review?: ServiceRequestReviewResponse | null): string {
  const submittedAt = review?.timings?.submittedAt;
  if (submittedAt) {
    return `Submitted: ${toDisplayDateTime(submittedAt)}`;
  }

  const activityLog = review?.activityLog ?? [];
  const latestTime = activityLog.reduce((acc, entry) => {
    const time = Date.parse(entry.date);
    if (Number.isNaN(time)) {
      return acc;
    }
    return time > acc ? time : acc;
  }, 0);

  if (latestTime > 0) {
    return `Last Update: ${toDisplayDateTime(new Date(latestTime).toISOString())}`;
  }

  return "Last Active: N/A";
}

function pickLatestDeliverable(
  deliverables?: ServiceRequestReviewDeliverable[] | null,
): ServiceRequestReviewDeliverable | null {
  if (!deliverables?.length) {
    return null;
  }

  const sorted = [...deliverables].sort((left, right) => {
    const leftTime = Date.parse(left.uploadedAt);
    const rightTime = Date.parse(right.uploadedAt);
    const safeLeft = Number.isNaN(leftTime) ? 0 : leftTime;
    const safeRight = Number.isNaN(rightTime) ? 0 : rightTime;
    return safeLeft - safeRight;
  });

  return sorted[sorted.length - 1] ?? deliverables[deliverables.length - 1];
}

function mapReviewActivityLog(
  review?: ServiceRequestReviewResponse | null,
): ServiceDetails["activityLog"] | null {
  const activityLog = review?.activityLog ?? [];

  if (activityLog.length === 0) {
    return null;
  }

  return activityLog.map((entry) => {
    const fileUrl = entry.files?.[0];

    if (fileUrl) {
      return {
        kind: "file" as const,
        title: entry.title,
        fileName: getFileName(fileUrl),
        timeLabel: toDisplayDateTime(entry.date),
      };
    }

    return {
      kind: "event" as const,
      title: entry.title,
      subtitle: null,
      timeLabel: toDisplayDateTime(entry.date),
    };
  });
}

function toIsoDate(value: string, fallback?: string): string {
  const candidate = value.trim();

  if (candidate) {
    const date = new Date(candidate);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }

  if (fallback) {
    return fallback;
  }

  return new Date().toISOString();
}

function buildAssignPayload(
  item: ServiceRequestListItem,
  post: PropertyPostItem,
  agents: AvailableAgentItem[],
): AssignAgentDialogPayload {
  const matchingAssignment = (post.serviceAssignments ?? []).find(
    (assignment) => assignment.id === item.service.id,
  );

  const serviceKey =
    item.service.serviceKey ??
    matchingAssignment?.serviceKey ??
    item.service.name;
  const responseDeadline =
    item.responseDeadline !== undefined
      ? item.responseDeadline
      : matchingAssignment?.responseDeadline ?? null;
  const serviceDescription = `Handle ${item.service.name} request for this property post.`;
  const serviceFeeBDT = item.service.feeAmount ?? matchingAssignment?.feeAmount ?? 0;
  const autoReassign = matchingAssignment?.autoReassign ?? false;

  return {
    postId: formatDisplayIdSafe(
      "POST",
      undefined,
      item.parentPost.id,
    ),
    sellPostId: item.parentPost.id,
    assignmentId: item.service.id,
    serviceKey,
    serviceName: matchingAssignment?.serviceName ?? item.service.name,
    zoneLabel: item.parentPost.location || resolveZoneLabel(post),
    serviceTitle: item.service.name,
    serviceDesc: serviceDescription,
    documents: getDocuments(post),
    serviceFeeBDT,
    deadlineLabel: toDisplayDate(responseDeadline),
    responseDeadlineISO: responseDeadline ?? undefined,
    autoReassign,
    agents: agents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      role: agent.designation,
      phone: agent.phone,
      avatarUrl: agent.photoUrl,
      activeJobs: agent.activeJobs,
      activeJobsLabel: `Active Jobs: ${agent.activeJobs} ${agent.activeJobsLabel}`,
      activeTone: toTone(agent.activeJobsLabel),
      matchesZone: agent.matchesZone,
      location: agent.location,
    })),
  };
}

function toStatusLabel(status: string): string {
  const normalized = status.toUpperCase();
  if (normalized === "IN_PROGRESS") return "In Progress";
  if (normalized === "PENDING_ASSIGNMENT" || normalized === "UNASSIGNED") return "Unassigned";
  if (normalized === "COMPLETED") return "Completed";
  return "Submitted";
}

function buildServiceDetails(
  item: ServiceRequestListItem,
  review?: ServiceRequestReviewResponse | null,
): ServiceDetails {
  const statusLabel = toStatusLabel(review?.status ?? item.status);
  const serviceName = review?.serviceName ?? item.service.name;
  const reviewActivity = mapReviewActivityLog(review);
  const activity =
    reviewActivity ??
    (item.latestWorkLog
      ? [
          {
            kind: "event" as const,
            title: item.latestWorkLog.title,
            subtitle: "Latest work log from backend",
            timeLabel: toDisplayDate(item.latestWorkLog.createdAt),
          },
        ]
      : [
          {
            kind: "event" as const,
            title: "No activity log available",
            subtitle: "Backend did not return activity history for this request",
            timeLabel: "-",
          },
        ]);

  const deliverable = pickLatestDeliverable(review?.deliverables ?? undefined);
  const deliverableFileUrl = deliverable?.files?.[0] ?? null;
  const deliverableFileName = deliverableFileUrl
    ? getFileName(deliverableFileUrl)
    : "No deliverable file available";
  const deliverableMeta = deliverable?.uploadedAt
    ? `Uploaded ${toDisplayDateTime(deliverable.uploadedAt)}`
    : deliverable
      ? "Uploaded"
      : "Unavailable";

  const agentName = review?.agent?.name ?? item.assignedAgent?.name ?? "Unassigned";
  const agentId = review?.agent?.id ?? item.assignedAgent?.id ?? "";
  const agentAvatar = review?.agent?.photo ?? item.assignedAgent?.photoUrl ?? null;
  const lastFeedback = review?.lastFeedback?.feedback
    ? {
        message: review.lastFeedback.feedback,
        timeLabel: review.lastFeedback.createdAt
          ? toDisplayDateTime(review.lastFeedback.createdAt)
          : "Previously sent",
      }
    : null;

  const serviceDisplayId = formatDisplayIdSafe(
    "SRV",
    undefined,
    item.service.id,
  );
  const postDisplayId = formatDisplayIdSafe(
    "POST",
    undefined,
    item.parentPost.id,
  );

  return {
    headerTitle: `Service Details: ${serviceName}`,
    serviceIdLabel: `${serviceDisplayId}-${postDisplayId.replace(/^#/, "")}`,
    statusChipLabel: statusLabel,
    agent: {
      id: agentId,
      name: agentName,
      role: "Assigned Agent",
      phone: review?.agent?.phone ?? "N/A",
      avatarUrl: agentAvatar,
      startedAtLabel: review?.timings?.startedAt
        ? `Started: ${toDisplayDateTime(review.timings.startedAt)}`
        : "Started: N/A",
      lastActiveLabel: getLastActiveLabel(review),
    },
    activityLog: activity,
    finalDeliverable: {
      fileName: deliverableFileName,
      meta: deliverableMeta,
      fileUrl: deliverableFileUrl,
    },
    lastFeedback,
  };
}

export default function ServiceRequestPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [type, setType] = React.useState("all");
  const [sort, setSort] = React.useState("newest");

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openDetails, setOpenDetails] = React.useState(false);
  const [selected, setSelected] = React.useState<ServiceRequestListItem | null>(
    null,
  );

  const [openAssign, setOpenAssign] = React.useState(false);
  const [assignPayload, setAssignPayload] =
    React.useState<AssignAgentDialogPayload | null>(null);

  const lastErrorMessageRef = React.useRef<string | null>(null);
  const lastSummaryErrorMessageRef = React.useRef<string | null>(null);
  const lastDetailsErrorMessageRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const normalizedStatus = normalizeStatus(status);
  const normalizedServiceType = normalizeServiceType(type);
  const sortParam = mapSortToApi(sort);

  const summaryQuery = useQuery({
    queryKey: ["admin-service-requests-summary"],
    queryFn: () => serviceRequestsSummaryService.getServiceRequestsSummary(),
  });

  const listQuery = useQuery({
    queryKey: [
      "admin-service-requests",
      page,
      rowsPerPage,
      normalizedStatus,
      normalizedServiceType,
      debouncedSearch,
      sortParam,
    ],
    queryFn: () =>
      serviceRequestsListService.getServiceRequests({
        page,
        limit: rowsPerPage,
        status: normalizedStatus,
        serviceType: normalizedServiceType,
        search: debouncedSearch,
        sort: sortParam,
      }),
    placeholderData: (previousData) => previousData,
  });

  const reviewQuery = useQuery({
    queryKey: ["admin-service-request-review", selected?.service.id],
    queryFn: () => {
      if (!selected?.service.id) {
        throw new Error("Assignment id is missing.");
      }

      return serviceRequestAssignmentService.getAssignmentReview(selected.service.id);
    },
    enabled: openDetails && Boolean(selected?.service.id),
  });

  const loadAssignPayloadMutation = useMutation({
    mutationFn: async (item: ServiceRequestListItem) => {
      const [post, agentsResponse] = await Promise.all([
        serviceRequestPostDetailService.getPostDetail(item.parentPost.id),
        serviceRequestAssignmentService.getAvailableAgents({
          sellPostId: item.parentPost.id,
          filter: "RECOMMENDED",
        }),
      ]);

      return buildAssignPayload(item, post, agentsResponse.data);
    },
    onSuccess: (payload) => {
      setAssignPayload(payload);
      setOpenAssign(true);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({
      dialogPayload,
      submitPayload,
    }: {
      dialogPayload: AssignAgentDialogPayload;
      submitPayload: AssignAgentSubmitPayload;
    }) => {
      return serviceRequestAssignmentService.assignAgent({
        sellPostId: dialogPayload.sellPostId,
        agentId: submitPayload.agentId,
        serviceKey: dialogPayload.serviceKey,
        serviceName: dialogPayload.serviceName,
        feeAmount: submitPayload.serviceFeeBDT,
        responseDeadline: toIsoDate(
          submitPayload.deadlineLabel,
          dialogPayload.responseDeadlineISO,
        ),
        documents: submitPayload.documents
          .filter((doc) => doc.selected)
          .map((doc) => doc.fileUrl)
          .filter((value): value is string => Boolean(value)),
        autoReassign: submitPayload.autoReassign,
      });
    },
    onSuccess: (response) => {
      toast.success(response.message || "Agent assigned successfully.");
      setOpenAssign(false);
      setAssignPayload(null);

      queryClient.invalidateQueries({ queryKey: ["admin-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-service-requests-summary"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const approveMutation = useMutation({
    mutationFn: (assignmentId: string) =>
      serviceRequestAssignmentService.approveSubmittedTask(assignmentId),
    onSuccess: (response) => {
      toast.success(response.message || "Task approved successfully.");
      setOpenDetails(false);

      queryClient.invalidateQueries({ queryKey: ["admin-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-service-requests-summary"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: ({ assignmentId, feedback }: { assignmentId: string; feedback: string }) =>
      serviceRequestAssignmentService.requestRevision(assignmentId, { feedback }),
    onSuccess: (response) => {
      toast.success(response.message || "Feedback sent successfully.");
      setOpenDetails(false);

      queryClient.invalidateQueries({ queryKey: ["admin-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-service-requests-summary"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  React.useEffect(() => {
    if (!listQuery.error) {
      lastErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(listQuery.error);

    if (lastErrorMessageRef.current !== message) {
      toast.error(message);
      lastErrorMessageRef.current = message;
    }
  }, [listQuery.error]);

  React.useEffect(() => {
    if (!summaryQuery.error) {
      lastSummaryErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(summaryQuery.error);

    if (lastSummaryErrorMessageRef.current !== message) {
      toast.error(message);
      lastSummaryErrorMessageRef.current = message;
    }
  }, [summaryQuery.error]);

  React.useEffect(() => {
    if (!reviewQuery.error) {
      lastDetailsErrorMessageRef.current = null;
      return;
    }

    const message = getErrorMessage(reviewQuery.error);

    if (lastDetailsErrorMessageRef.current !== message) {
      toast.error(message);
      lastDetailsErrorMessageRef.current = message;
    }
  }, [reviewQuery.error]);

  const rows = listQuery.data?.data ?? [];
  const meta = listQuery.data?.meta;

  const totalCount = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 0;

  React.useEffect(() => {
    if (totalPages === 0) {
      if (page !== 1) {
        setPage(1);
      }
      return;
    }

    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const stats = summaryQuery.data?.data ?? DEFAULT_SUMMARY;

  const typeOptions = React.useMemo(
    () => buildOptions(rows.map((item) => item.service.name)),
    [rows],
  );

  const details = React.useMemo(() => {
    if (!selected) {
      return {
        headerTitle: "Service Details",
        serviceIdLabel: "#N/A",
        statusChipLabel: "Submitted",
        agent: {
          id: "",
          name: "Unassigned",
          role: "Assigned Agent",
          phone: "N/A",
          avatarUrl: null,
          startedAtLabel: "Started: N/A",
          lastActiveLabel: "Last Active: N/A",
        },
        activityLog: [
          {
            kind: "event" as const,
            title: "No activity log available",
            subtitle: "Open a submitted task details endpoint response to hydrate this section",
            timeLabel: "-",
          },
        ],
        finalDeliverable: {
          fileName: "No deliverable metadata from API",
          meta: "Unavailable",
          fileUrl: null,
        },
        lastFeedback: null,
      };
    }

    return buildServiceDetails(selected, reviewQuery.data ?? null);
  }, [selected, reviewQuery.data]);

  const onView = React.useCallback((item: ServiceRequestListItem) => {
    setSelected(item);
    setOpenDetails(true);
  }, []);

  const onAssignAgent = React.useCallback((item: ServiceRequestListItem) => {
    setAssignPayload(null);
    loadAssignPayloadMutation.mutate(item);
  }, [loadAssignPayloadMutation]);

  const handleAssignNow = React.useCallback(
    (payload: AssignAgentSubmitPayload) => {
      if (!assignPayload) {
        toast.error("Assignment payload is not ready.");
        return;
      }

      assignMutation.mutate({
        dialogPayload: assignPayload,
        submitPayload: payload,
      });
    },
    [assignMutation, assignPayload],
  );

  const handleApprove = React.useCallback(() => {
    const assignmentId = selected?.service.id;

    if (!assignmentId) {
      toast.error("Assignment id is missing.");
      return;
    }

    approveMutation.mutate(assignmentId);
  }, [approveMutation, selected]);

  const handleSendFeedback = React.useCallback(
    (feedback: string) => {
      const assignmentId = selected?.service.id;

      if (!assignmentId) {
        toast.error("Assignment id is missing.");
        return;
      }

      const trimmed = feedback.trim();
      if (!trimmed) {
        toast.error("Please enter feedback before submitting.");
        return;
      }

      feedbackMutation.mutate({ assignmentId, feedback: trimmed });
    },
    [feedbackMutation, selected],
  );

  return (
    <div className="w-full space-y-4">
      <ServiceRequestsOverview stats={stats} isLoading={summaryQuery.isLoading} />

      <ServiceRequestsToolbar
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        status={status}
        onStatus={(value) => {
          setStatus(value || "all");
          setPage(1);
        }}
        type={type}
        onType={(value) => {
          setType(value || "all");
          setPage(1);
        }}
        typeOptions={typeOptions}
        sort={sort}
        onSort={(value) => {
          setSort(value || "newest");
          setPage(1);
        }}
      />

      <ServiceRequestsTable
        items={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        totalPages={Math.max(totalPages, 1)}
        isLoading={listQuery.isLoading || loadAssignPayloadMutation.isPending}
        isFetching={listQuery.isFetching}
        onPageChange={setPage}
        onRowsChange={(nextRowsPerPage) => {
          setRowsPerPage(nextRowsPerPage);
          setPage(1);
        }}
        onView={onView}
        onAssignAgent={onAssignAgent}
      />

      <ServiceDetailsDialog
        open={openDetails}
        onOpenChange={setOpenDetails}
        details={details}
        onApprove={handleApprove}
        onRequestRevision={handleSendFeedback}
        isSubmitting={approveMutation.isPending || feedbackMutation.isPending}
      />

      <AssignAgentDialog
        open={openAssign}
        onOpenChange={setOpenAssign}
        payload={assignPayload ?? undefined}
        onAssign={handleAssignNow}
      />
    </div>
  );
}
