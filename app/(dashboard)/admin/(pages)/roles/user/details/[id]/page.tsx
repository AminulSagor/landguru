
import UserDetailsHeader from "@/app/(dashboard)/admin/(pages)/roles/user/_components/user-details-header";
import UserLeftColumn from "@/app/(dashboard)/admin/(pages)/roles/user/_components/user-left-column";
import UserMiddleColumn from "@/app/(dashboard)/admin/(pages)/roles/user/_components/user-middle-column";
import UserRightColumn from "@/app/(dashboard)/admin/(pages)/roles/user/_components/user-right-column";
import { users } from "@/app/(dashboard)/admin/dummy-data/user-list-data";

interface Props {
  params: { id: string };
}

const UserDetailsPage = async ({ params }: Props) => {
  const param = await params;
  const user = users.find((u) => u.userId === param.id || u.id === param.id);

  if (!user) return <div className="text-gray">User not found</div>;

  return (
    <div>
      <UserDetailsHeader user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-14 gap-4 mt-7">
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <UserLeftColumn user={user} />
        </div>

        <div className="col-span-12 lg:col-span-6 space-y-4">
          <UserMiddleColumn user={user} />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <UserRightColumn />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
