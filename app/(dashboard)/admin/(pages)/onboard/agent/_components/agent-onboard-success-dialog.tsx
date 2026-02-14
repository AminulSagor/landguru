"use client";

import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import Image from "next/image";
import { Check } from "lucide-react";

export default function AgentOnboardSuccessDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // ✅ static (from screenshot)
  const agent = {
    name: "Adv. Rahat Ahmed",
    email: "rahat.ahmed@example.com",
    phone: "+8801234567890",
    role: "Lawyer",
    avatar: "/images/avatars/avatar.png",
    agentId: "LAW-2026-0001",
    tempPassword: "********",
    location: "House 12, Road 7, Sector 4, Uttara, Dhaka.",
    services: [
      { title: "Ownership History Validation", fee: 3000 },
      { title: "Pentagraph Map", fee: 2500 },
      { title: "Document Organization", fee: 1500 },
    ],
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size="lg"
      className="overflow-hidden"
    >
      <div>
        {/* top success */}
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-full bg-[#DCFCE7] flex items-center justify-center">
            <div className="h-9 w-9 rounded-full bg-green flex items-center justify-center">
              <Check size={18} className="text-white" />
            </div>
          </div>

          <p className="mt-4 text-xl font-semibold text-black">
            Agent Account Created Successfully
          </p>

          <p className="mt-2 text-sm text-gray max-w-md">
            The credentials and account details have been sent to the agent via
            SMS and Email.
          </p>
        </div>

        {/* agent mini card */}
        <div className="mt-6 rounded-xl border border-gray/10 bg-secondary px-5 py-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-white border border-gray/10">
            <Image
              src={agent.avatar}
              alt={agent.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-black">{agent.name}</p>
            <p className="text-xs text-gray mt-1">{agent.email}</p>
            <p className="text-xs text-gray">{agent.phone}</p>

            <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs bg-[#EFF6FF] text-primary border border-primary/15">
              {agent.role}
            </span>
          </div>
        </div>

        {/* two cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* personal credentials */}
          <div className="rounded-xl border border-gray/10 bg-white px-5 py-4">
            <p className="text-xs font-semibold text-gray tracking-wide uppercase">
              Personal Credentials
            </p>

            <div className="mt-4">
              <p className="text-xs text-gray">Agent ID</p>
              <p className="mt-1 text-sm font-semibold text-black">
                {agent.agentId}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray">Temporary Password</p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {agent.tempPassword}
                </p>
              </div>

              <button
                type="button"
                className="h-9 w-9 rounded-lg border border-gray/15 bg-white hover:bg-secondary flex items-center justify-center"
                onClick={() => navigator.clipboard.writeText("TEMP_PASSWORD")}
                aria-label="Copy password"
              >
                <span className="text-primary text-sm">⧉</span>
              </button>
            </div>
          </div>

          {/* assigned location */}
          <div className="rounded-xl border border-gray/10 bg-white px-5 py-4">
            <p className="text-xs font-semibold text-gray tracking-wide uppercase">
              Assigned Location
            </p>

            <div className="mt-4 flex items-start gap-2">
              <span className="mt-0.5 text-primary">📍</span>
              <p className="text-sm text-black leading-relaxed">
                {agent.location}
              </p>
            </div>
          </div>
        </div>

        {/* services & fees */}
        <div className="mt-5 rounded-xl border border-gray/10 bg-white px-5 py-4">
          <p className="text-xs font-semibold text-gray tracking-wide uppercase">
            Services & Fees
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {agent.services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-primary/15 bg-[#EFF6FF] px-4 py-3"
              >
                <p className="text-xs font-semibold text-black">{s.title}</p>
                <p className="mt-3 text-sm font-semibold text-primary">
                  ৳ {s.fee.toLocaleString("en-US")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* done */}
        <div className="mt-8 flex justify-center">
          <Button className="h-11 px-16" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
