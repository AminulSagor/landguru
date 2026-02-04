import Image from "next/image";
import React from "react";

type AuthShellProps = {
  children: React.ReactNode;
  heroTitle: string;
  heroSubtitle?: string;
  heroBadgeText?: string; // LandGuru
};

export default function AuthShell({
  children,
  heroTitle,
  heroSubtitle,
  heroBadgeText = "LandGuru",
}: AuthShellProps) {
  return (
    <div className="w-full min-h-screen flex">
      {/* LEFT */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/images/admin-login-home.jpg"
          fill
          className="object-cover"
          alt="admin-login-home"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="absolute inset-0 flex items-center justify-center px-10">
          <div className="max-w-md text-center">
            <span className="inline-block rounded-md bg-white px-3 py-1 text-base font-extrabold text-primary">
              {heroBadgeText}
            </span>

            <h1 className="mt-4 text-4xl font-extrabold text-white leading-tight">
              {heroTitle}
            </h1>

            {heroSubtitle ? (
              <p className="mt-4 text-sm text-white/80">
                {heroSubtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
