import AuthShell from "@/app/(public)/auth/admin/_components/auth-shell";
import LoginCard from "@/app/(public)/auth/admin/_components/login-card";

export default function Page() {
  return (
    <AuthShell
      heroTitle={"Empowering Trust in\nReal Estate"}
      heroSubtitle="Securely manage your property portfolio, agent networks, and zone services from one centralized command center."
    >
      <LoginCard />
    </AuthShell>
  );
}
