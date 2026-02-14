import UserPersonalDetailsCard from "@/app/(dashboard)/admin/(pages)/users/_components/user-personal-details-card";
import { User } from "@/app/(dashboard)/admin/types/user-lists-types";

export default function UserMiddleColumn({ user }: { user: User }) {
  return <UserPersonalDetailsCard user={user} />;
}
