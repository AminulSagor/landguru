import UserAccountMetricsCard from "@/app/(dashboard)/admin/(pages)/users/_components/user-account-metrics-card";
import UserProfileCard from "@/app/(dashboard)/admin/(pages)/users/_components/user-profile-card";
import UserVerificationStatusCard from "@/app/(dashboard)/admin/(pages)/users/_components/user-verification-status-card";
import { User } from "@/app/(dashboard)/admin/types/user-lists-types";

export default function UserLeftColumn({ user }: { user: User }) {
  return (
    <>
      <UserProfileCard user={user} />
      <UserVerificationStatusCard />
      <UserAccountMetricsCard />
    </>
  );
}
