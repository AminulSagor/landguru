import Card from "@/components/cards/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { User } from "@/app/(dashboard)/admin/types/user-lists-types";

export default function UserDetailsHeader({ user }: { user: User }) {
  const name = user?.profile?.name ?? "John Doe";
  const userId = user?.userId ?? "#ID-8829";

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm flex gap-2 items-center">
          <Link
            href={"/admin/users"}
            className="text-gray hover:text-black"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="text-gray">Users</span>
          <span className="text-gray">{">"}</span>
          <span className="text-black">
            {name} ({userId})
          </span>
        </p>
      </div>
    </Card>
  );
}
