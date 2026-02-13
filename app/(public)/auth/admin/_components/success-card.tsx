"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import Button from "@/components/buttons/button";

export default function ResetSuccessCard() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray/10 p-8">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-green/30 flex items-center justify-center">
            <div className="h-11 w-11 rounded-full bg-green/40 flex items-center justify-center border-3 border-green/60">
              <Check className="text-green" size={22} />
            </div>
          </div>
        </div>

        <h2 className="mt-4 text-center text-base font-extrabold text-black">
          Reset Request Sent
        </h2>

        <p className="mt-2 text-center text-xs font-medium text-gray/80 leading-relaxed">
          Your request to reset your password has been sent to the Super Admin.
          You will be contacted soon to verify.
        </p>

        <div className="mt-6">
          <Link href="/auth/admin/login">
            <Button className="w-full">
              <span className="inline-flex items-center gap-2">
                ← Back to Login
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs font-medium text-gray/60">
        © 2026 LandGuru Admin Portal. All rights reserved.
      </p>
    </div>
  );
}
