"use client";

import AcceptTaskCard from "@/app/(dashboard)/agent/(pages)/tasks/_components/accept-task-card";
import AppointmentDateTimeDialog from "@/app/(dashboard)/agent/(pages)/tasks/_components/appointment-date-time-dialog";
import AppointmentCard from "@/app/(dashboard)/agent/(pages)/tasks/_components/ppointment-card";
import PropertyClientInfo from "@/app/(dashboard)/agent/(pages)/tasks/_components/property-client-info";
import PropertyDetails from "@/app/(dashboard)/agent/(pages)/tasks/_components/property-details";
import PropertyPhotos from "@/app/(dashboard)/agent/(pages)/tasks/_components/property-photos";
import RawDocuments from "@/app/(dashboard)/agent/(pages)/tasks/_components/raw-documents";
import ReviewDialog from "@/app/(dashboard)/agent/(pages)/tasks/_components/review-dialog";
import ScheduleFixedDialog from "@/app/(dashboard)/agent/(pages)/tasks/_components/schedule-fixed-dialog";
import ServiceFeeCard from "@/app/(dashboard)/agent/(pages)/tasks/_components/service-fee-card";
import SubmitForReviewCard from "@/app/(dashboard)/agent/(pages)/tasks/_components/submit-for-review-card";
import SubmitSuccessDialog from "@/app/(dashboard)/agent/(pages)/tasks/_components/submit-success-dialog";
import TaskDetailsHeader from "@/app/(dashboard)/agent/(pages)/tasks/_components/task-details-header";
import TaskStatusCard from "@/app/(dashboard)/agent/(pages)/tasks/_components/task-status-card";
import WorkLogCard from "@/app/(dashboard)/agent/(pages)/tasks/_components/work-log-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { formatApiError } from "@/lib/format-api-error";
import { useEffect, useState } from "react";
import agentTaskService from "@/service/agent/agent-task.service";
import type { UiTaskDetails } from "@/types/agent/task.types";

const normalizeStatus = (value: unknown) => String(value ?? "").trim().toUpperCase();

const getStageFromPayload = (payload: any): UiTaskDetails["stage"] => {
  const status = normalizeStatus(payload?.status);
  const taskStatus = normalizeStatus(payload?.taskStatus);

  if (status === "COMPLETED" || taskStatus === "COMPLETED") return "completed";
  if (status === "SUBMITTED" || taskStatus === "SUBMITTED") return "submitted";
  if (status === "IN_PROGRESS" || taskStatus === "IN_PROGRESS") return "active";

  return "pending_accepting";
};

const getStatusLabel = (payload: any) => {
  const rawStatus = payload?.status ?? payload?.taskStatus;
  const normalized = normalizeStatus(rawStatus);
  return normalized || undefined;
};

/** Map raw API payload to the UiTaskDetails shape used by all sub-components. */
const mapPayloadToUi = (payload: any, fallbackId: string): UiTaskDetails => {
  const mapped: UiTaskDetails = {
    id: payload.assignmentId ?? fallbackId,
    title: payload.task?.serviceName ?? "—",
    serviceKey: payload.task?.serviceKey ?? undefined,
    code: payload.assignmentId ? `#${String(payload.assignmentId).slice(0, 8)}` : "",
    stage: getStageFromPayload(payload),
    statusLabel: getStatusLabel(payload),
    acceptBefore: payload.task?.acceptBefore ?? undefined,
    postedAgo: payload.task?.postedAt ?? "",
    updatedAgo: payload.workLog?.data?.[0]?.createdAt ?? undefined,

    clientName: payload.client?.name ?? "",
    verified: (payload.client?.verificationStatus ?? "").toLowerCase() === "verified",
    avatarUrl: payload.client?.photoUrl ?? undefined,

    propertyType: payload.property?.propertyType ?? "",
    landUnit: payload.property?.sellableUnit ?? "Katha",
    plotSizeValue: payload.property?.totalPlotSize ?? undefined,
    plotSize: payload.property?.totalPlotSize
      ? `${payload.property.totalPlotSize} ${payload.property.sellableUnit ?? ""}`
      : "",
    sellableLandValue: payload.property?.sellableAmount ?? undefined,
    sellableLand: payload.property?.sellableAmount
      ? `${payload.property.sellableAmount} ${payload.property.sellableUnit ?? ""}`
      : "",
    roadDistance:
      payload.property?.roadDistanceMin || payload.property?.roadDistanceMax
        ? `${payload.property?.roadDistanceMin ?? ""}m–${payload.property?.roadDistanceMax ?? ""}m`
        : "",
    location: payload.property?.locationText ?? "",

    photos: payload.photos ?? [],
    morePhotosCount: Math.max(0, (payload.photos?.length ?? 0) - 3),

    rawDocs: [],

    serviceFee: payload.serviceFee ?? 0,
    appointment: {
      isScheduled: !!payload.appointment?.isAppointmentScheduled,
      appointmentTitle: payload.appointment?.appointmentTitle,
      appointmentDate: payload.appointment?.appointmentDate,
      appointmentTime: payload.appointment?.appointmentTime ?? undefined,
    },
    workLog: (payload.workLog?.data ?? []).map((entry: any) => ({
      title: entry.title ?? "",
      fileUrls: entry.fileUrls ?? [],
      createdAt: entry.createdAt ?? "",
    })),
  };

  // collect raw document file names
  const docs: string[] = [];
  if (payload.rawDocuments) {
    docs.push(...(payload.rawDocuments.deedFiles ?? []));
    docs.push(...(payload.rawDocuments.khatianFiles ?? []));
    docs.push(...(payload.rawDocuments.otherFiles ?? []));
  }
  mapped.rawDocs = docs.map((p: string) => ({
    name: String(p).split("/").pop() ?? p,
    url: p,
  }));

  return mapped;
};

export default function TaskDetails({ id }: { id: string }) {
  const [data, setData] = useState<UiTaskDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [scheduleFixedDialog, setScheduleFixedDialog] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  // const isPending = true;
  // const isActive = true;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    agentTaskService
      .getTaskDetails(id)
      .then((payload: any) => {
        if (!mounted) return;
        setData(mapPayloadToUi(payload, id));
      })
      .catch((err: any) => {
        console.error("Failed to load task details", err);
        setError(formatApiError(err).message || "Failed to load task details");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="min-h-screen">Loading...</div>;
  if (error || !data) return <div className="min-h-screen">Failed to load task details.</div>;

  const isPending = data.stage === "pending_accepting";
  const isActive = data.stage === "active";
  const isSubmitted = data.stage === "submitted";
  const serviceTypeLabel = data.serviceKey
    ? String(data.serviceKey)
        .split("_")
        .map((s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s))
        .join(" ")
    : data.title ?? "SERVICE TYPE";

  const handleSubmitReview = async () => {
    if (submittingReview) return;

    setSubmittingReview(true);
    try {
      await agentTaskService.submitReview(data.id, { rating: 5 });
      toast.success("Submitted for review");
      setReview(false);
      setSuccess(true);

      const payload: any = await agentTaskService.getTaskDetails(data.id);
      setData(mapPayloadToUi(payload, data.id));
    } catch (err: any) {
      console.error("Failed to submit for review", err);
      toast.error(formatApiError(err).message || "Failed to submit for review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div>
        {/* top back + title */}
        <Link href={"/agent/tasks"}>
          <div className="mb-6 flex items-center gap-2 font-semibold">
            <span className="cursor-pointer hover:text-gray">
              <ArrowLeft size={18} />
            </span>
            <span className="font-extrabold">Task Details</span>
          </div>
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* LEFT */}
          <div className="space-y-5">
            <TaskDetailsHeader data={data} />

            <PropertyClientInfo data={data} />

            <PropertyDetails data={data} />

            <PropertyPhotos data={data} />

            <RawDocuments data={data} />
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <TaskStatusCard stage={data.stage} />

            <AppointmentCard setOpen={setOpen} appointment={data.appointment} />

            <ServiceFeeCard fee={data.serviceFee} />

            {isPending ? (
              <AcceptTaskCard
                assignmentId={data.id}
                onAccepted={async () => {
                  try {
                    const payload: any = await agentTaskService.getTaskDetails(data.id);
                    setData(mapPayloadToUi(payload, data.id));
                  } catch (err: any) {
                    console.error("Failed to refresh task details after accept", err);
                    toast.error(formatApiError(err).message || "Failed to refresh task details");
                  }
                }}
              />
            ) : null}

            {(isActive || isSubmitted) ? (
              <>
                <WorkLogCard
                  assignmentId={data.id}
                  onAdded={async () => {
                    try {
                      const payload: any = await agentTaskService.getTaskDetails(data.id);
                      setData(mapPayloadToUi(payload, data.id));
                    } catch (err: any) {
                      console.error("Failed to refresh task details after posting worklog", err);
                      toast.error(formatApiError(err).message || "Failed to refresh task details");
                    }
                  }}
                />
                {isActive ? (
                  <SubmitForReviewCard setReview={setReview} submitting={submittingReview} />
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* dialogs */}
      <AppointmentDateTimeDialog
        open={open}
        onOpenChange={setOpen}
        setScheduleFixedDialog={setScheduleFixedDialog}
        assignmentId={data.id}
        isReschedule={!!data.appointment?.isScheduled}
        onSuccess={(resp: any) => {
          const appt = resp?.appointment ?? null;
          const wasScheduled = !!data.appointment?.isScheduled;
          setData((prev) =>
            prev
              ? {
                  ...prev,
                  appointment: {
                    isScheduled: !!appt?.isAppointmentScheduled,
                    appointmentTitle: appt?.appointmentTitle,
                    appointmentDate: appt?.appointmentDate,
                    appointmentTime: appt?.appointmentTime ?? undefined,
                  },
                }
              : prev,
          );
          setScheduleFixedDialog(true);
          toast.success(wasScheduled ? "Appointment rescheduled" : "Appointment scheduled");
        }}
      />
      <ScheduleFixedDialog
        open={scheduleFixedDialog}
        onOpenChange={setScheduleFixedDialog}
        serviceType={serviceTypeLabel}
        title={data?.title}
        refId={data?.code}
      />

      <ReviewDialog
        review={review}
        setReview={setReview}
        onConfirm={handleSubmitReview}
        submitting={submittingReview}
      />
      <SubmitSuccessDialog
        success={success}
        setSuccess={setSuccess}
        serviceType={serviceTypeLabel}
        title={data?.title}
        refId={data?.code}
      />
    </div>
  );
}
