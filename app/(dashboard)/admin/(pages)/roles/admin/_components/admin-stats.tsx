import { AdminManageStats } from "@/app/(dashboard)/admin/types/admin-list-type";
import Card from "@/components/cards/card";
import { Shield, MapPin, Users } from "lucide-react";

export default function AdminStats({ stats }: { stats: AdminManageStats }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-12 md:col-span-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray">Total Admins</p>
            <p className="mt-2 text-3xl font-semibold text-primary">
              {stats.totalAdmins}
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="col-span-12 md:col-span-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray">Active Locations</p>
            <p className="mt-2 text-3xl font-semibold text-primary">
              {stats.activeLocations}
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="col-span-12 md:col-span-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray">Total Workforce</p>
            <p className="mt-2 text-3xl font-semibold text-primary">
              {stats.totalWorkforce}{" "}
              <span className="text-sm font-medium text-gray">Agents</span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
            <Users className="h-5 w-5 text-green" />
          </div>
        </div>
      </Card>
    </div>
  );
}
