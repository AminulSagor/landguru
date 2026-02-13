import AuthShell from "@/app/(public)/auth/admin/_components/auth-shell";
import ForgotPasswordCard from "@/app/(public)/auth/admin/_components/forgot-card";

export default function Page() {
  return (
    <AuthShell
      heroTitle={"Recover Your Access"}
      heroSubtitle="Securely manage your property portfolio, agent networks, and zone services from one centralized command center."
    >
      <ForgotPasswordCard />
    </AuthShell>
  );
}
