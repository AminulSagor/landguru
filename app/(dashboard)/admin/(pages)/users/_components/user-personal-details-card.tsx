import { User } from "@/app/(dashboard)/admin/types/user-lists-types";
import Card from "@/components/cards/card";
import { ChevronDown } from "lucide-react";

export default function UserPersonalDetailsCard({ user }: { user: User }) {
  const fullName = user?.profile?.name ?? "John Doe";
  const phone = user?.phone ?? "+880 1711-432***";
  const email = user?.profile?.email ?? "john.doe@example.com";


  const address = {
    division: "Rajshahi",
    district: "Rajshahi",
    upazilla: "Bogura",
    pourashava: "Bogura Pourashova",
    wardNo: "03",
    postalCode: "5800",
    fullAddress:
      "Holding #45, Ward #03, Bogura Pourashava, Bogura Sadar, Bogura-5800, Rajshahi",
  };

  return (
    <Card>
      <p className="font-semibold text-black">Personal Details</p>
      <div className="h-px bg-gray/10 mt-4" />

      <div className="mt-5">
        <Label>Full Name</Label>
        <InputLike value={fullName} />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Phone Number</Label>
          <InputLike value={phone} />
        </div>

        <div>
          <Label>Email Address</Label>
          <InputLike value={email} />
        </div>
      </div>

      <div className="h-px bg-gray/10 mt-6" />

      <div className="mt-6">
        <p className="text-sm font-semibold text-black">Address Information</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectLike label="Division" value={address.division} />
          <SelectLike label="District" value={address.district} />
          <SelectLike label="Upazilla" value={address.upazilla} />
          <SelectLike label="Pourashova/City Corp/Union" value={address.pourashava} />
          <SelectLike label="Ward No" value={address.wardNo} />
          <InputBlock label="Postal Code" value={address.postalCode} />
        </div>

        <div className="mt-4">
          <Label>Full Address</Label>
          <div className="rounded-lg border border-gray/10 bg-secondary/30 px-4 py-3">
            <p className="text-sm text-black">{address.fullAddress}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray uppercase">{children}</p>;
}

function InputLike({ value }: { value: string }) {
  return (
    <div className="mt-2 rounded-lg border border-gray/10 bg-secondary/30 px-4 py-3">
      <p className="text-sm text-black">{value}</p>
    </div>
  );
}

function InputBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <InputLike value={value} />
    </div>
  );
}

function SelectLike({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 rounded-lg border border-gray/10 bg-secondary/30 px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-black">{value}</p>
        <ChevronDown size={16} className="text-gray" />
      </div>
    </div>
  );
}
