import Card from "@/components/cards/card";
import Image from "next/image";
import { Mail, Phone, Calendar, MapPin } from "lucide-react";

export default function AdminProfileCard({
  profile,
}: {
  profile: {
    name: string;
    adminId: string;
    roleText: string;
    email: string;
    phone: string;
    joinedText: string;
    address: string;
    avatarUrl?: string;
  };
}) {
  return (
    <Card>
      <div className="flex md:items-center flex-col md:flex-row  justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-secondary overflow-hidden">
              {profile.avatarUrl ? (
                <Image src={profile.avatarUrl} alt="avatar" width={64} height={64} />
              ) : null}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold text-primary">{profile.name}</p>
              <p className="text-sm font-semibold text-gray">{profile.adminId}</p>
            </div>
            <p className="text-sm font-medium text-gray">{profile.roleText}</p>

            <div className="mt-3 flex flex-wrap items-center gap-10 text-sm font-medium text-gray">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {profile.joinedText}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray/15 px-4 py-5 text-sm bg-secondary/50 text-primary">
          <MapPin className="h-4 w-4 text-primary" />
          {profile.address}
        </div>
      </div>
    </Card>
  );
}
