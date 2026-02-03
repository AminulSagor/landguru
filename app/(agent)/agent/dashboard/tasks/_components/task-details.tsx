"use client";
import AcceptTaskCard from "@/app/(agent)/agent/dashboard/tasks/_components/accept-task-card";
import AppointmentDateTimeDialog from "@/app/(agent)/agent/dashboard/tasks/_components/appointment-date-time-dialog";
import AppointmentCard from "@/app/(agent)/agent/dashboard/tasks/_components/ppointment-card";
import PropertyClientInfo from "@/app/(agent)/agent/dashboard/tasks/_components/property-client-info";
import PropertyDetails from "@/app/(agent)/agent/dashboard/tasks/_components/property-details";
import PropertyPhotos from "@/app/(agent)/agent/dashboard/tasks/_components/property-photos";
import RawDocuments from "@/app/(agent)/agent/dashboard/tasks/_components/raw-documents";
import ReviewDialog from "@/app/(agent)/agent/dashboard/tasks/_components/review-dialog";
import ScheduleFixedDialog from "@/app/(agent)/agent/dashboard/tasks/_components/schedule-fixed-dialog";
import ServiceFeeCard from "@/app/(agent)/agent/dashboard/tasks/_components/service-fee-card";
import SubmitForReviewCard from "@/app/(agent)/agent/dashboard/tasks/_components/submit-for-review-card";
import SubmitSuccessDialog from "@/app/(agent)/agent/dashboard/tasks/_components/submit-success-dialog";
import TaskDetailsHeader from "@/app/(agent)/agent/dashboard/tasks/_components/task-details-header";
import TaskStatusCard from "@/app/(agent)/agent/dashboard/tasks/_components/task-status-card";
import WorkLogCard from "@/app/(agent)/agent/dashboard/tasks/_components/work-log-card";
import { mockTaskDetailsById } from "@/app/(agent)/agent/dummy-data/mock-task-details";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TaskDetails({ id }: { id: string }) {
  const data = mockTaskDetailsById(id);

  const isPending = data.stage === "pending_accepting";
  const isActive = data.stage === "active";

  const [open, setOpen] = useState<boolean>(false);
  const [scheduleFixedDialog, setScheduleFixedDialog] =
    useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // const isPending = true;
  // const isActive = true;

  return (
    <div className="min-h-screen">
      <div>
        {/* top back + title */}
        <Link href={"/agent/dashboard/tasks"}>
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

            <AppointmentCard setOpen={setOpen} />

            <ServiceFeeCard fee={data.serviceFee} />

            {isPending ? <AcceptTaskCard /> : null}

            {isActive ? (
              <>
                <WorkLogCard />
                <SubmitForReviewCard setReview={setReview} />
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
      />
      <ScheduleFixedDialog
        open={scheduleFixedDialog}
        onOpenChange={setScheduleFixedDialog}
      />

      <ReviewDialog
        review={review}
        setReview={setReview}
        setSuccess={setSuccess}
      />
      <SubmitSuccessDialog success={success} setSuccess={setSuccess} />
    </div>
  );
}
