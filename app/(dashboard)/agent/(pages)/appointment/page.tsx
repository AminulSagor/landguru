"use client";
import { Tab, TabConfig } from "@/components/tabs/tab";
import { useState, useEffect, useCallback, useMemo } from "react";

import Card from "@/components/cards/card";
import Dialog from "@/components/dialogs/dialog";
import ServerError from "@/components/errors/server-error";
import Pagination from "@/app/(dashboard)/agent/(pages)/tasks/_components/pagination";
import { ChevronRight, User } from "lucide-react";
import { formatApiError } from "@/lib/format-api-error";
import agentAppointmentsService from "@/service/agent/agent-appointments.service";
import type {
  AgentAppointmentDetails,
  AgentAppointmentItem,
  AgentAppointmentTab,
  AgentAppointmentsMeta,
} from "@/types/agent/appointments.types";

type TabKey = "upcoming" | "past";
const PAGE_SIZE = 10;

const mapTabToApi = (t: TabKey): AgentAppointmentTab =>
  t === "past" ? "PAST" : "UPCOMING";

const normalizeAppointmentsList = (payload: any) => {
  if (!payload) return { data: [] as AgentAppointmentItem[], meta: null as AgentAppointmentsMeta | null };
  const hasNested =
    payload?.data &&
    !Array.isArray(payload.data) &&
    (Array.isArray(payload.data.data) || payload.data.meta);
  const root = hasNested ? payload.data : payload;
  const data = Array.isArray(root?.data) ? root.data : [];
  const meta = root?.meta ?? null;
  return { data, meta };
};

const normalizeAppointmentItem = (payload: any): AgentAppointmentDetails | null => {
  if (!payload) return null;
  const hasNested =
    payload?.data &&
    !Array.isArray(payload.data) &&
    (Array.isArray(payload.data.data) || payload.data.meta);
  const root = hasNested ? payload.data : payload;
  const data = root?.data ?? root;
  if (Array.isArray(data)) return data[0] ?? null;
  if (data && typeof data === "object") return data as AgentAppointmentDetails;
  return null;
};

const AppointmentPage = () => {
  const [tabKey, setTabKey] = useState<TabKey>("upcoming");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<AgentAppointmentItem[]>([]);
  const [meta, setMeta] = useState<AgentAppointmentsMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<{ message: string; code?: number } | null>(null);
  const [previewError, setPreviewError] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [detailsItem, setDetailsItem] = useState<AgentAppointmentDetails | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const val = params.get("serverError") || params.get("error");
    if (val) {
      const parsed = parseInt(val, 10);
      setServerError({
        message: "We had trouble reaching the server. Please try again later.",
        code: Number.isNaN(parsed) ? 500 : parsed,
      });
      setPreviewError(true);
    }
  }, []);

  const tabs: TabConfig<TabKey>[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
  ];

  const totalPages = useMemo(() => {
    if (meta?.totalPages) return Math.max(1, meta.totalPages);
    const total = meta?.total ?? items.length;
    return Math.max(1, Math.ceil(total / PAGE_SIZE));
  }, [meta, items.length]);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setServerError(null);

    try {
      const response = await agentAppointmentsService.getAppointments({
        page,
        limit: PAGE_SIZE,
        tab: mapTabToApi(tabKey),
      });

      const normalized = normalizeAppointmentsList(response);
      setItems(normalized.data);
      setMeta(normalized.meta);
    } catch (err: any) {
      const formatted = formatApiError(err);
      setServerError({ message: formatted.message, code: formatted.code });
    } finally {
      setLoading(false);
    }
  }, [page, tabKey]);

  useEffect(() => {
    if (previewError) return;
    fetchAppointments();
  }, [previewError, fetchAppointments]);

  const handleTabChange = (next: TabKey) => {
    setTabKey(next);
    setPage(1);
  };

  const handleRetry = () => {
    if (typeof window === "undefined") return;
    if (previewError) {
      window.location.href = window.location.pathname;
      return;
    }
    fetchAppointments();
  };

  const handleOpenDetails = async (assignmentId: string) => {
    if (!assignmentId) return;
    setDetailsOpen(true);
    setDetailsLoading(true);
    setDetailsError(null);
    setDetailsItem(null);

    try {
      const response = await agentAppointmentsService.getAppointmentDetails(assignmentId);
      const item = normalizeAppointmentItem(response);
      if (!item) {
        setDetailsError("No appointment details found.");
      } else {
        setDetailsItem(item);
      }
    } catch (err: any) {
      const formatted = formatApiError(err);
      setDetailsError(formatted.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (serverError) {
    return (
      <div className="py-24">
        <div className="mx-auto max-w-6xl">
          <ServerError
            title={`Server Error${serverError.code ? ` — ${serverError.code}` : ""}`}
            message={serverError.message}
            code={serverError.code}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      <Tab tabs={tabs} tabKey={tabKey} onChangeTabKey={handleTabChange} />
      <div className="space-y-4">
        {loading ? (
          <div className="py-10 text-center text-sm font-semibold text-gray/60">
            Loading appointments...
          </div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-sm font-semibold text-gray/60">
            No appointments found.
          </div>
        ) : (
          items.map((item) => (
            <AppointmentListCard
              key={item.assignmentId}
              item={item}
              onOpenDetails={handleOpenDetails}
            />
          ))
        )}
      </div>

      {totalPages > 1 ? (
        <div className="pt-2">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      ) : null}

      <AppointmentDetailsDialog
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);
          if (!open) {
            setDetailsItem(null);
            setDetailsError(null);
            setDetailsLoading(false);
          }
        }}
        loading={detailsLoading}
        error={detailsError}
        item={detailsItem}
      />
    </div>
  );
};

export default AppointmentPage;

function AppointmentListCard({
  item,
  onOpenDetails,
}: {
  item: AgentAppointmentItem;
  onOpenDetails: (assignmentId: string) => void;
}) {
  const code = item.assignmentId ? `#${String(item.assignmentId).slice(0, 8)}` : "";
  const isVisitToday = !!item.tags?.isVisitToday;
  const tag = item.tags?.propertyTypeTag || item.sellPost?.propertyType || "";

  return (
    <button
      type="button"
      onClick={() => onOpenDetails(item.assignmentId)}
      className="w-full text-left"
    >
      <Card className="rounded-2xl p-5 flex gap-5 items-start transition-shadow hover:shadow-sm">
        <div className="flex h-38 w-38 flex-col items-center justify-center rounded-xl bg-secondary text-primary font-extrabold">
          <span className="text-sm">{item.appointmentDate?.month ?? "—"}</span>
          <span className="text-2xl">{item.appointmentDate?.day ?? "—"}</span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-gray">
                {item.sellPost?.title ?? "—"}
              </h3>
              <p className="text-xs font-semibold text-gray/50">{code}</p>
            </div>

            <ChevronRight className="text-gray/30" size={18} />
          </div>

          <p className="mt-2 text-sm font-semibold text-gray">
            <span className="font-extrabold">SERVICE TYPE:</span>{" "}
            {item.agent?.assignedService ?? "—"}
          </p>

          <p className="mt-1 text-sm font-medium text-gray/70">{item.sellPost?.location ?? "—"}</p>

          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray">
            <User size={14} />
            Agent: {item.agent?.name ?? "—"}
          </div>

          <div className="mt-3 flex items-center gap-2">
            {tag ? (
              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-bold text-primary">
                {tag}
              </span>
            ) : null}

            {isVisitToday ? (
              <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                Visit Today
              </span>
            ) : (
              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-bold text-primary">
                Upcoming Visit
              </span>
            )}
          </div>
        </div>
      </Card>
    </button>
  );
}

function AppointmentDetailsDialog({
  open,
  onOpenChange,
  loading,
  error,
  item,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  error: string | null;
  item: AgentAppointmentDetails | null;
}) {
  const title =
    item?.sellPost?.title ??
    item?.property?.title ??
    item?.appointmentTitle ??
    "Appointment Details";
  const code = item?.assignmentId ? `#${String(item.assignmentId).slice(0, 8)}` : "";
  const dateValue = item?.appointmentDate;
  const dateFull = typeof dateValue === "string" ? dateValue : dateValue?.full ?? "—";
  const status = item?.status ?? item?.appointmentStatus ?? "—";
  const serviceType = item?.agent?.assignedService ?? item?.service?.name ?? "—";
  const agentName = item?.agent?.name ?? item?.client?.name ?? "—";
  const agentLabel = item?.agent?.name
    ? "Agent"
    : item?.client?.name
      ? "Client"
      : "Agent";
  const propertyType = item?.sellPost?.propertyType ?? item?.property?.propertyType ?? "—";
  const location = item?.sellPost?.location ?? item?.property?.location ?? "—";
  const tag =
    item?.tags?.propertyTypeTag ??
    item?.sellPost?.propertyType ??
    item?.property?.propertyType ??
    "";
  const showVisitTag = item?.tags?.isVisitToday !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-gray">{title}</h3>
          {code ? <p className="text-xs font-semibold text-gray/50">{code}</p> : null}
        </div>

        {loading ? (
          <div className="py-8 text-center text-sm font-semibold text-gray/60">
            Loading appointment details...
          </div>
        ) : error ? (
          <p className="text-sm font-semibold text-red-600">{error}</p>
        ) : item ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DetailRow label="Date & Time" value={dateFull} />
            <DetailRow label="Status" value={status} />
            <DetailRow label="Service Type" value={serviceType} />
            <DetailRow label={agentLabel} value={agentName} />
            <DetailRow label="Property Type" value={propertyType} />
            <DetailRow label="Location" value={location} className="md:col-span-2" />
            <div className="md:col-span-2">
              <div className="text-xs font-semibold text-gray/50">Tags</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tag ? (
                  <span className="rounded-md bg-secondary px-2 py-1 text-xs font-bold text-primary">
                    {tag}
                  </span>
                ) : null}
                {showVisitTag && item.tags?.isVisitToday ? (
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                    Visit Today
                  </span>
                ) : showVisitTag ? (
                  <span className="rounded-md bg-secondary px-2 py-1 text-xs font-bold text-primary">
                    Upcoming Visit
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm font-semibold text-gray/60">No appointment details available.</p>
        )}
      </div>
    </Dialog>
  );
}

function DetailRow({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-xs font-semibold text-gray/50">{label}</div>
      <div className="mt-1 text-sm font-semibold text-gray">{value}</div>
    </div>
  );
}
