import AdminProfile from "@/app/(admin)/admin/dashboard/(pages)/profile/_components/admin-profile-settings";
import SuperAdminProfile from "@/app/(admin)/admin/dashboard/(pages)/profile/_components/super-admin-profile-settings";
import { currentUser } from "@/helpers/helpers";

const page = () => {
  return (
    <div>
      {currentUser === "admin" ? <AdminProfile /> : <SuperAdminProfile />}
    </div>
  );
};

export default page;
