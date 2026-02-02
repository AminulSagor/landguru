import AcceptTaskCard from "@/app/(agent)/agent/dashboard/tasks/_components/accept-task-card";
import AppointmentCard from "@/app/(agent)/agent/dashboard/tasks/_components/ppointment-card";
import PropertyClientInfo from "@/app/(agent)/agent/dashboard/tasks/_components/property-client-info";
import PropertyDetails from "@/app/(agent)/agent/dashboard/tasks/_components/property-details";
import PropertyPhotos from "@/app/(agent)/agent/dashboard/tasks/_components/property-photos";
import RawDocuments from "@/app/(agent)/agent/dashboard/tasks/_components/raw-documents";
import ServiceFeeCard from "@/app/(agent)/agent/dashboard/tasks/_components/service-fee-card";
import SubmitForReviewCard from "@/app/(agent)/agent/dashboard/tasks/_components/submit-for-review-card";
import TaskDetailsHeader from "@/app/(agent)/agent/dashboard/tasks/_components/task-details-header";
import TaskStatusCard from "@/app/(agent)/agent/dashboard/tasks/_components/task-status-card";
import WorkLogCard from "@/app/(agent)/agent/dashboard/tasks/_components/work-log-card";
import { mockTaskDetailsById } from "@/app/(agent)/agent/dummy-data/mock-task-details";

export default async function TaskDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const param = await params;
  const data = mockTaskDetailsById(param.id);

  const isPending = data.stage === "pending_accepting";
  const isActive = data.stage === "active";

  // const isPending = true;
  // const isActive = true;

  return (
    <div className="min-h-screen">
      <div className="">
        {/* top back + title */}
        <div className="mb-6 flex items-center gap-2 font-semibold">
          <span className="cursor-pointer hover:text-gray">←</span>
          <span className="font-extrabold">Task Details</span>
        </div>

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

            <AppointmentCard />

            <ServiceFeeCard fee={data.serviceFee} />

            {isPending ? <AcceptTaskCard /> : null}

            {isActive ? (
              <>
                <WorkLogCard />
                <SubmitForReviewCard />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
