import AdminRecentActivityTask from "@/app/(dashboard)/admin/(pages)/dashboard/_components/admin-recent-activity-task";
import AdminStaticOverview from "@/app/(dashboard)/admin/(pages)/dashboard/_components/admin-statistics-overview";
import AdminTodaysAppointmentsCard from "@/app/(dashboard)/admin/(pages)/dashboard/_components/admin-toady-appointment-card";
import AssignedLocationCard from "@/app/(dashboard)/admin/(pages)/dashboard/_components/assign-location-card";
import LocationPerformanceTable from "@/app/(dashboard)/admin/(pages)/dashboard/_components/location-perfomance-table";
import SuperAdminRecentActivity from "@/app/(dashboard)/admin/(pages)/dashboard/_components/super-admin-recent-activity";
import SuperAdminStats from "@/app/(dashboard)/admin/(pages)/dashboard/_components/super-admin-stats";
import { getCurrentUserRole } from "@/utils/get.role.utils";

const Page = async () => {
  const currentUser = await getCurrentUserRole();

  return (
    <>
      {currentUser === "admin" ? (
        <div className="space-y-6">
          <AdminStaticOverview />
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <AdminRecentActivityTask />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <AssignedLocationCard location="Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh." />
              <AdminTodaysAppointmentsCard />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <SuperAdminStats />
          <div className="grid lg:grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              <LocationPerformanceTable />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <SuperAdminRecentActivity />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
