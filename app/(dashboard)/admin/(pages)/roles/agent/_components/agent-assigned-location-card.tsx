import Card from "@/components/cards/card";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function AgentAssignedLocationCard() {
  // Screenshot static
  const location = {
    division: "Rajshahi",
    district: "Rajshahi",
    upazila: "Bogura",
    pourashava: "Bogura Pourashava",
    wardNo: "03",
    postalCode: "5800",
    fullAddress:
      "Holding #45, Ward #03, Bogura Pourashava,\nBogura Sadar, Bogura-5800, Rajshahi",
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-primary" />
          <p className="font-semibold text-black">Assigned Location</p>
        </div>

        <Link href="#" className="text-sm text-primary font-medium">
          View History
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Division" value={location.division} />
        <Field label="District" value={location.district} />
        <Field label="Upazila" value={location.upazila} />
        <Field label="Pourashava/City Corp/Union" value={location.pourashava} />
        <Field label="Ward No" value={location.wardNo} />
        <Field label="Postal Code" value={location.postalCode} />
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray uppercase">Full Address</p>
        <div className="mt-2 rounded-lg border border-gray/10 bg-secondary px-4 py-3">
          <p className="text-sm text-black whitespace-pre-line">
            {location.fullAddress}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray uppercase">{label}</p>
      <div className="mt-2 rounded-lg border border-gray/10 bg-secondary/30 px-4 py-3">
        <p className="text-sm text-black">{value}</p>
      </div>
    </div>
  );
}
