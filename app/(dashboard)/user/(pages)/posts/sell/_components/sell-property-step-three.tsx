"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Info, Lock } from "lucide-react";
import Button from "@/components/buttons/button";
import { StepThreeValues } from "@/app/(dashboard)/user/types/property-sell-post";

type ServiceItem = {
  id: string;
  label: string;
  mandatory?: boolean;
};

type Props = {
  defaultValues?: Partial<StepThreeValues>;
  onBack: () => void;
  onNext: (data: StepThreeValues) => void;
};

const MANDATORY_SERVICES: ServiceItem[] = [
  {
    id: "ownership_history_validation",
    label: "Ownership History Validation",
    mandatory: true,
  },
  { id: "pentagraph_map", label: "Pentagraph Map", mandatory: true },
  {
    id: "physical_estimate_border_demarcation",
    label: "Physical estimate & Border Demarcation",
    mandatory: true,
  },
  {
    id: "document_organization",
    label: "Document Organization",
    mandatory: true,
  },
];

const OPTIONAL_SERVICES: ServiceItem[] = [
  {
    id: "registration_deed_writing",
    label: "Property Registration/ Deed Writing Service",
  },
  {
    id: "namjari_dcr_pouro_update",
    label: "Namjari/ DCR/ Pouro City Corp Record Update",
  },
  { id: "inheritance_dispute_analysis", label: "Inheritance Dispute Analysis" },
  { id: "gov_acquisition_risk", label: "Government Acquisition Risk" },
  { id: "court_case_verification", label: "Court case verification" },
];

function SectionTitle({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold tracking-wider text-gray uppercase">
        {title}
      </p>
      {right}
    </div>
  );
}

function ServiceRow({
  checked,
  disabled,
  title,
  mandatory,
  onToggle,
}: {
  checked: boolean;
  disabled?: boolean;
  title: string;
  mandatory?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className={
        "flex items-center justify-between rounded-xl border px-4 py-4 bg-white " +
        (disabled ? "border-secondary opacity-90" : "border-secondary")
      }
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onToggle}
          className="h-5 w-5 accent-(--color-primary)"
        />

        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {mandatory ? (
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-gray">
              <Lock className="h-3 w-3" />
              Mandatory
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function SellPropertyStepThreeForm({
  defaultValues,
  onBack,
  onNext,
}: Props) {
  const { handleSubmit, watch, setValue } = useForm<StepThreeValues>({
    defaultValues: {
      mandatoryServiceIds: MANDATORY_SERVICES.map((s) => s.id),
      optionalServiceIds: [],
      ...(defaultValues ?? {}),
    },
    mode: "onChange",
  });

  const optionalSelected = watch("optionalServiceIds") || [];

  const toggleOptional = (id: string) => {
    const exists = optionalSelected.includes(id);
    const next = exists
      ? optionalSelected.filter((x) => x !== id)
      : [...optionalSelected, id];

    setValue("optionalServiceIds", next, { shouldValidate: true });
  };

  const submit = (data: StepThreeValues) => {
    // always enforce mandatory
    const mandatory = MANDATORY_SERVICES.map((s) => s.id);
    onNext({
      mandatoryServiceIds: mandatory,
      optionalServiceIds: data.optionalServiceIds ?? [],
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
        Verification Services
      </h2>
      <p className="mt-2 text-sm text-gray">
        Select the services needed to verify your land. Mandatory items ensure a
        faster sale and are pre-selected.
      </p>

      <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-8">
        {/* Info banner */}
        <div className="rounded-xl border border-secondary bg-secondary px-4 py-3 flex items-start gap-3">
          <div className="mt-0.5 h-8 w-8 rounded-lg bg-white flex items-center justify-center">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm text-gray">
            You will be prompted for accepting and negotiating with quotation of
            the service fees later after we review your submission.
          </p>
        </div>

        {/* Mandatory */}
        <div className="space-y-4">
          <SectionTitle title="Mandatory Services" />
          <div className="space-y-3">
            {MANDATORY_SERVICES.map((s) => (
              <ServiceRow
                key={s.id}
                checked
                disabled
                title={s.label}
                mandatory
              />
            ))}
          </div>
        </div>

        {/* Optional */}
        <div className="space-y-4">
          <SectionTitle
            title="Optional Services"
            right={
              <span className="text-xs text-gray">Choose what applies</span>
            }
          />
          <div className="space-y-3">
            {OPTIONAL_SERVICES.map((s) => (
              <ServiceRow
                key={s.id}
                checked={optionalSelected.includes(s.id)}
                title={s.label}
                onToggle={() => toggleOptional(s.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-secondary">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
