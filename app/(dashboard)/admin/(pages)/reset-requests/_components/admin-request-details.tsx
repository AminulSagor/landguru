import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import Image from "next/image";
import { ResetRequest } from "@/app/(dashboard)/admin/types/admin-reset-types";
import { AlertTriangle, Info, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import AdminResetCredentialsDialog from "@/app/(dashboard)/admin/(pages)/reset-requests/_components/admin-reset-credentials-dialog";

export default function AdminRequestDetails({ data }: { data: ResetRequest }) {
  const [openReset, setOpenReset] = useState(false);

  return (
    <>
      <Card className="p-0 overflow-hidden">
        <div className="flex min-h-[620px] flex-col">
          {/* ===== HEADER ===== */}
          <div className=" pt-6">
            <div className="flex items-start justify-between gap-6">
              {/* left */}
              <div className="flex items-start gap-4">
                <Image
                  src={data.avatar}
                  width={56}
                  height={56}
                  alt="avatar"
                  className="rounded-full"
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-primary">
                      {data.name}
                    </h3>

                    {data.actionRequired && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF3D6] px-3 py-1 text-[11px] font-semibold text-[#A16207]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                        ACTION REQUIRED
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs font-medium text-gray">
                    Admin Identifier:{" "}
                    <span className="text-primary">{data.adminId}</span>{" "}
                    <span className="text-gray">|</span> Ticket:{" "}
                    <span className="text-primary">{data.id}</span>
                  </p>
                </div>
              </div>

              {/* right */}
              <div className="text-right">
                <p className="text-[11px] font-semibold tracking-widest text-gray">
                  REQUEST TIME
                </p>
                <p className="mt-1 text-sm font-semibold text-primary">
                  Received{" "}
                  <span className="font-semibold">
                    {data.time === "45m ago" ? "45 mins ago" : data.time}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-5 border-b border-gray/10" />
          </div>

          {/* ===== BODY ===== */}
          <div className="flex-1 py-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Assigned Zone */}
              <div className="col-span-12 md:col-span-6">
                <p className="text-[11px] font-semibold tracking-widest text-gray">
                  ASSIGNED ZONE
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#F3E8FF] px-4 py-2 text-sm font-semibold text-[#6D28D9]">
                  <MapPin className="h-4 w-4" />
                  {data.zone}
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#F97316]">
                  <AlertTriangle className="h-4 w-4" />
                  Zone is currently unmanaged
                </div>
              </div>

              {/* Contact info */}
              <div className="col-span-12 md:col-span-6">
                <p className="text-[11px] font-semibold tracking-widest text-gray">
                  CONTACT INFORMATION
                </p>

                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-gray/15 bg-white px-4 py-3">
                    <Phone className="h-4 w-4 text-gray" />
                    <p className="text-sm font-medium text-primary">
                      {data.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-gray/15 bg-white px-4 py-3">
                    <Mail className="h-4 w-4 text-gray" />
                    <p className="text-sm font-medium text-primary">
                      {data.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info banner */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#F5DFA8] bg-[#FFF9E8] px-4 py-4">
              <Info className="mt-0.5 h-4 w-4 text-[#F59E0B]" />
              <p className="text-sm font-medium text-[#A16207]">
                This administrator has requested a password reset due to
                &quot;Forgotten credentials&quot;. Verify identity via the
                provided contact number before proceeding with the reset.
              </p>
            </div>
          </div>

          {/* ===== FOOTER ACTION BAR ===== */}
          <div className="flex flex-col md:flex-row  gap-2 md:items-center justify-between border-t border-gray/10 bg-white px-6 py-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray hover:text-primary"
            >
              <Trash2 className="h-4 w-4" />
              Discard Request
            </button>

            <div className="flex items-center gap-3">
              <Button variant="secondary">Deny</Button>

              {/* Screenshot uses red here, so using hex (not tailwind default) */}
              <Button
                variant="primary"
                className="bg-[#E03131] hover:bg-[#C92A2A] text-white"
                onClick={() => setOpenReset(true)}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <AdminResetCredentialsDialog
        open={openReset}
        onOpenChange={setOpenReset}
        data={data}
      />
    </>
  );
}
