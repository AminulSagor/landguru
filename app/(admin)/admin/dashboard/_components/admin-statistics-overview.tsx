import AdminStatCard from "@/app/(admin)/admin/dashboard/_components/admin-stat-card";
import { ShieldAlert, Users, Wallet, Wrench } from "lucide-react";

const AdminStaticOverview = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AdminStatCard
        title="Pending Quotation"
        value={5}
        variant="danger"
        footerText="+4 since yesterday"
        footerTone="down"
        icon={<ShieldAlert size={18} />}
      />

      <AdminStatCard
        title="Active Services"
        value={45}
        variant="primary"
        subText="8 pending review"
        icon={<Wrench size={18} />}
      />

      <AdminStatCard
        title="Agent Availability"
        value="8/12"
        variant="success"
        subText="Online now"
        icon={<Users size={18} />}
      />

      <AdminStatCard
        title="Zone Revenue (Monthly)"
        value="৳ 4.5 L"
        variant="neutral"
        footerText="12% vs last month"
        footerTone="up"
        icon={<Wallet size={18} />}
      />
    </div>
  );
};

export default AdminStaticOverview;
