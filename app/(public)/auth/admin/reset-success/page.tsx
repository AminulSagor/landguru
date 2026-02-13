import AuthShell from "@/app/(public)/auth/admin/_components/auth-shell";
import ResetSuccessCard from "@/app/(public)/auth/admin/_components/success-card";

export default function Page() {
  return (
    <AuthShell
      heroTitle={"Recover Your Access"}
      heroSubtitle="Securely manage your property portfolio, agent networks, and zone services from one centralized command center."
    >
      <ResetSuccessCard />
    </AuthShell>
  );
}
