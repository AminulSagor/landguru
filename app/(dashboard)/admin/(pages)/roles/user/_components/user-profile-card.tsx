import { User } from "@/app/(dashboard)/admin/types/user-lists-types";
import Card from "@/components/cards/card";
import Image from "next/image";

export default function UserProfileCard({ user }: { user: User }) {
  const name = user?.profile?.name ?? "John Doe";
  const userId = user?.userId ?? "#ID-8829";

  // screenshot static
  const memberSince = "Member since Oct 24, 2023";
  const typeChip = "Limited Access";
  const roleText = "Buyer / Seller";

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="h-22 w-22 rounded-full overflow-hidden border border-gray/15 bg-secondary">
            <Image
              src={"/images/avatars/avatar.png"}
              alt={name}
              width={88}
              height={88}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green border-2 border-white" />
        </div>

        <p className="mt-3 text-lg font-semibold text-black">{name}</p>
        <p className="text-sm text-gray mt-1">{memberSince}</p>
        <p className="text-sm text-gray">{userId}</p>

        <div className="w-full mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray">Type</span>
            <span className="px-3 py-1 rounded-full text-xs bg-secondary text-green border border-gray/10">
              {typeChip}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray">Role</span>
            <span className="text-black font-medium">{roleText}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
