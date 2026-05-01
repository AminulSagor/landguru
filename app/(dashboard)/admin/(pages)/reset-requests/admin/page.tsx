import AdminRequestDetails from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/admin-request-details";
import AdminResetStats from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/admin-reset-stats";
import PendingQueue from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/pending-queue";
import {
  demoRequests,
  demoStats,
} from "@/app/(dashboard)/admin/dummy-data/admin-reset.data";
import type { ResetRequest } from "@/app/(dashboard)/admin/types/admin-reset-types";
import { IMAGE } from "@/constants/image-paths";
import { formatAdminDisplayId } from "@/utils/id.utils";

type ResetAdminSearchParams = {
  adminId?: string;
  name?: string;
  email?: string;
  phone?: string;
  zone?: string;
  avatar?: string;
};

interface Props {
  searchParams?: Promise<ResetAdminSearchParams>;
}

export default async function ResetRequestsPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const adminId = params.adminId;

  const selectedRequest: ResetRequest = adminId
    ? {
        id: adminId,
        name: params.name || "Selected Admin",
        adminId: formatAdminDisplayId(adminId),
        avatar: params.avatar || IMAGE.avatar,
        time: "Now",
        phone: params.phone || "N/A",
        email: params.email || "N/A",
        zone: params.zone || "N/A",
        actionRequired: true,
      }
    : demoRequests[0];

  const queueItems = [
    selectedRequest,
    ...demoRequests.filter(
      (item) =>
        item.id !== selectedRequest.id &&
        item.adminId !== selectedRequest.adminId,
    ),
  ];

  return (
    <div className="space-y-5">
      <AdminResetStats stats={demoStats} />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4">
          <PendingQueue items={queueItems} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <AdminRequestDetails data={selectedRequest} />
        </div>
      </div>
    </div>
  );
}