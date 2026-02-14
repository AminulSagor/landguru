import UserInvestmentVaultCard from "@/app/(dashboard)/admin/(pages)/users/_components/user-investment-vault-card";
import UserVerificationDocumentsCard from "@/app/(dashboard)/admin/(pages)/users/_components/user-verification-documents-card";

export default function UserRightColumn() {
  return (
    <>
      <UserVerificationDocumentsCard />
      <UserInvestmentVaultCard />
    </>
  );
}
