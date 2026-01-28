"use client";

import React from "react";
import Card from "@/components/cards/card";
import {
  Unlock,
  ShieldCheck,
  CheckCircle2,
  PlayCircle,
  ChevronUp,
  Clock3,
  FileText,
  Map,
  Users2,
} from "lucide-react";
import PropertyMediaAndLegalDocsSection from "@/app/(user)/dashboard/(pages)/my-property-details/[id]/_components/PropertyMediaAndLegalDocsSection";

const MyPropertyUnlocked = () => {
  const [open, setOpen] = React.useState({
    risk: true,
    video: true,
    ownership: true,
    legal: true,
    penta: true,
    services: true,
  });

  const toggle = (key: keyof typeof open) =>
    setOpen((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="bg-secondary/80 p-6 md:p-8 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 flex items-center justify-center">
          <Unlock className="text-primary" size={18} />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-black">
          Unlocked Features
        </h3>
      </div>

      <div className="mt-6 space-y-5">
        {/* 1) Risk checklist */}
        <FeatureAccordion
          title="Risk & Due Diligence Checklist"
          icon={<ShieldCheck className="text-primary" size={18} />}
          open={open.risk}
          onToggle={() => toggle("risk")}
        >
          <ul className="space-y-2 text-sm">
            <CheckItem text="Fraud Detection Passed" />
            <CheckItem text="Inheritance dispute analysis checked" />
            <CheckItem text="Multiple ownership checked" />
            <CheckItem text="Government acquisition risk checked" />
          </ul>
        </FeatureAccordion>

        {/* 2) Property Video */}
        <FeatureAccordion
          title="Property Video"
          icon={<PlayCircle className="text-primary" size={18} />}
          open={open.video}
          onToggle={() => toggle("video")}
        >
          <div className="mt-3 rounded-2xl border border-black/10 bg-primary/5 p-4">
            <div className="h-72 md:h-75 rounded-2xl bg-primary/10 flex items-center justify-center">
              <button
                type="button"
                className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-sm"
              >
                <PlayCircle size={26} className="text-white" />
              </button>
            </div>
          </div>
        </FeatureAccordion>

        {/* 3) Ownership History */}
        <FeatureAccordion
          title="Ownership History"
          icon={<Clock3 className="text-primary" size={18} />}
          open={open.ownership}
          onToggle={() => toggle("ownership")}
        >
          <OwnershipTimeline />
        </FeatureAccordion>

        {/* 4) Validated Legal Documents */}
        <PropertyMediaAndLegalDocsSection
          isVideo={false}
          deedDocs={[
            { name: "Deed document 1.pdf", size: "1.5MB", ext: "pdf" },
            { name: "Deed document 2.docx", size: "2.2MB", ext: "docx" },
          ]}
          khatianDocs={[
            { name: "CS Khatian.pdf", size: "1.5MB", ext: "pdf" },
            { name: "SA Khatian.docx", size: "2.2MB", ext: "docx" },
            { name: "RS Khatian.pdf", size: "3.5MB", ext: "pdf" },
          ]}
        />

        {/* 5) Pentagraph Map */}
        <FeatureAccordion
          title="Pentagraph Map"
          icon={<Map className="text-primary" size={18} />}
          open={open.penta}
          onToggle={() => toggle("penta")}
        >
          <div className="mt-3 rounded-2xl border border-black/10 bg-white p-4">
            <div className="h-56 md:h-64 rounded-2xl bg-black/5 flex items-center justify-center">
              {/* Replace with your svg/image later */}
              <div className="text-sm font-extrabold text-black/35">
                Pentagraph Diagram
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-black/45">
              Detailed Mouza map of the area
            </p>
          </div>
        </FeatureAccordion>

        {/* 6) Services Taken */}
        <FeatureAccordion
          title="Services Taken"
          icon={<Users2 className="text-primary" size={18} />}
          open={open.services}
          onToggle={() => toggle("services")}
          description="Get to see which services was taken by the seller"
        >
          <ServicesTaken />
        </FeatureAccordion>
      </div>
    </div>
  );
};

export default MyPropertyUnlocked;

/* ------------------------- sub components (same file) ------------------------- */

function FeatureAccordion({
  title,
  description,
  icon,
  open,
  onToggle,
  children,
  highlighted,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  highlighted?: boolean; // for the "Validated Legal Documents" look
}) {
  return (
    <Card
      className={[
        "p-5 md:p-6 shadow-sm",
        highlighted ? "border border-primary/30" : "",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{icon}</div>

          <div>
            <p className="text-base font-extrabold text-black">{title}</p>
            {description ? (
              <p className="mt-1 text-xs text-black/40 font-semibold">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <ChevronUp
          size={18}
          className={[
            "text-black/35 transition-transform",
            open ? "rotate-0" : "rotate-180",
          ].join(" ")}
        />
      </button>

      {open ? <div className="mt-4">{children}</div> : null}
    </Card>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle2 className="text-green" size={16} />
      <span className="text-green font-semibold">{text}</span>
    </li>
  );
}

function OwnershipTimeline() {
  const items = [
    { name: "Farhan", years: "2022 – Present", current: true },
    { name: "Mithila Akhter", years: "2010 – 2022", current: false },
    { name: "Trusted Developer", years: "2007 – 2010", current: false },
  ];

  return (
    <div className="relative pl-6">
      {/* vertical line */}
      <div className="absolute left-2 top-1 bottom-1 w-0.5 bg-black/10" />

      <div className="space-y-6">
        {items.map((it, idx) => (
          <div key={idx} className="relative ">
            {/* dot */}
            <div
              className={[
                "absolute -left-[2px] top-1.5 h-3 w-3 rounded-full",
                it.current ? "bg-primary" : "bg-black/15",
              ].join(" ")}
            />

            <div className="flex items-start justify-between gap-3 pl-6">
              <div>
                <p
                  className={[
                    "font-extrabold",
                    it.current ? "text-black" : "text-black/45",
                  ].join(" ")}
                >
                  {it.name}
                </p>
                <p
                  className={[
                    "text-sm font-semibold",
                    it.current ? "text-primary" : "text-black/35",
                  ].join(" ")}
                >
                  {it.years}
                </p>
              </div>

              {it.current ? (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary">
                  Current
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesTaken() {
  const services = [
    {
      title: "Ownership History Validation",
      person: "Rahman",
      role: "Lawyer",
      verified: true,
      avatar: "/images/avatars/avatar.png", // optional (can keep empty)
    },
    {
      title: "Pentagraph Map Validation",
      person: "Abrar",
      role: "Field Assistant",
      verified: true,
      avatar: "/images/avatars/avatar.png",
    },
    {
      title: "Deed Writing Service",
      person: "Sahil",
      role: "Lawyer",
      verified: true,
      avatar: "/images/avatars/avatar.png",
    },
  ];

  return (
    <div className="relative">
      {/* Left rail + circles (match 2nd SS) */}
      <div className="absolute left-3 top-0 bottom-0 flex flex-col items-center">
        {/* top spacer so line starts a bit lower like SS */}
        <div className="h-7" />

        {/* line */}
        <div className="w-0.5 flex-1 bg-black/10" />

        {/* bottom spacer */}
        <div className="h-7" />
      </div>

      <div className="space-y-6 pl-10">
        {services.map((s, idx) => (
          <div key={idx} className="relative">
            {/* Circle indicator aligned per-card */}
            <div className="absolute -left-10 top-6 flex items-center justify-center">
              <div className="h-7 w-7 rounded-full bg-white border-[3px] border-primary" />
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-extrabold text-black">{s.title}</p>

                {s.verified ? (
                  <span className="px-4 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary">
                    Verified
                  </span>
                ) : null}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 overflow-hidden shrink-0">
                  {/* If you don't have avatars yet, remove img, keep bg circle */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {s.avatar ? (
                    <img
                      src={s.avatar}
                      alt={s.person}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div>
                  <p className="text-sm font-extrabold text-black">
                    {s.person}
                  </p>
                  <p className="text-xs font-semibold text-black/45">
                    {s.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
