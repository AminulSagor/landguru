import AdminProfile from "@/app/(dashboard)/admin/(pages)/profile/_components/admin-profile-settings";
import SuperAdminProfile from "@/app/(dashboard)/admin/(pages)/profile/_components/super-admin-profile-settings";
import { getCurrentUserRole } from "@/utils/get.role.utils";

const Page = async () => {
  const currentUser = await getCurrentUserRole();

  return <div>{currentUser === "admin" ? <AdminProfile /> : <SuperAdminProfile />}</div>;
};

export default Page;
