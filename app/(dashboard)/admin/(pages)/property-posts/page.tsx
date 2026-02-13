import PropertyFiltersBar from "@/app/(dashboard)/admin/(pages)/property-posts/_components/filter-select";
import PropertiesManagementTable from "@/app/(dashboard)/admin/(pages)/property-posts/_components/PropertiesManagementTable";
import StatusSummaryCards from "@/app/(dashboard)/admin/(pages)/property-posts/_components/stat-cards";

const page = () => {
  return (
    <div className="space-y-5">
      <StatusSummaryCards />
      <PropertyFiltersBar />

      <PropertiesManagementTable />
    </div>
  );
};

export default page;
