import Card from "@/components/cards/card";

const AppointmentStatOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Pending Requests"
        value={8}
        bedgeText="+2 new"
        bedgeColor="bg-red-200 text-red-500"
        valueColor="text-red-500"
      />
      <StatCard
        title="Scheduled Today"
        value={12}
        bedgeText="busy day"
        bedgeColor="bg-blue-200 text-blue-500"
        valueColor="text-blue-500"
      />
      <StatCard title="Agent Service Visits" value={24} />
      <StatCard title="Buyer Site Visits" value={7} />
    </div>
  );
};

export default AppointmentStatOverview;

/* stat card */

interface StatCardProps {
  title: string;
  value: number;
  valueColor?: string;
  bedgeText?: string;
  bedgeColor?: string;
}
function StatCard({
  title,
  value,
  valueColor,
  bedgeText,
  bedgeColor,
}: StatCardProps) {
  return (
    <Card>
      <h2 className="text-gray text-base">{title}</h2>
      <div className="flex items-end gap-2 mt-2">
        <h1 className={`text-3xl font-bold ${valueColor}`}>{value}</h1>
        <p className={`px-2 py-1 text-xs rounded-full ${bedgeColor}`}>
          {bedgeText}
        </p>
      </div>
    </Card>
  );
}
