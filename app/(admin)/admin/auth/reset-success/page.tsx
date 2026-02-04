import AuthShell from "@/app/(admin)/admin/auth/_components/auth-shell";
import ResetSuccessCard from "@/app/(admin)/admin/auth/_components/success-card";


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
