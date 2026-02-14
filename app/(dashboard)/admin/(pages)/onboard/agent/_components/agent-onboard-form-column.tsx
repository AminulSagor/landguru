import Card from "@/components/cards/card";
import type { AgentOnboardFormState } from "@/app/(dashboard)/admin/types/agent-onboard-types";
import { ChevronDown } from "lucide-react";

export default function AgentOnboardFormColumn({
  state,
  onChange,
}: {
  state: AgentOnboardFormState;
  onChange: (next: AgentOnboardFormState) => void;
}) {
  return (
    <>
      <Card>
        <SectionTitle step="1" title="Personal Credentials" />

        <div className="mt-4 space-y-4">
          <Input label="Full Name" placeholder="e.g. Adv. Rahat Ahmed" value={state.personal.fullName}
            onChange={(v) => onChange({ ...state, personal: { ...state.personal, fullName: v } })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Phone Number" placeholder="+880 1XXX XXXXX" value={state.personal.phone}
              onChange={(v) => onChange({ ...state, personal: { ...state.personal, phone: v } })}
            />
            <Input label="Email Address" placeholder="agent@landguru.com" value={state.personal.email}
              onChange={(v) => onChange({ ...state, personal: { ...state.personal, email: v } })}
            />
          </div>

          <Input label="Password" placeholder="********" value={state.personal.password}
            onChange={(v) => onChange({ ...state, personal: { ...state.personal, password: v } })}
            type="password"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Bank Name" placeholder="DBBL" value={state.personal.bankName}
              onChange={(v) => onChange({ ...state, personal: { ...state.personal, bankName: v } })}
            />
            <Input label="Bank Account No." placeholder="123456789" value={state.personal.bankAccountNo}
              onChange={(v) => onChange({ ...state, personal: { ...state.personal, bankAccountNo: v } })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Bank SWIFT Code" placeholder="DBBLBDDH" value={state.personal.bankSwiftCode}
              onChange={(v) => onChange({ ...state, personal: { ...state.personal, bankSwiftCode: v } })}
            />
            <Input label="Bank Routing No." placeholder="123456789" value={state.personal.bankRoutingNo}
              onChange={(v) => onChange({ ...state, personal: { ...state.personal, bankRoutingNo: v } })}
            />
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle step="2" title="Assigned Location" />

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectLike
              label="Division"
              value={state.location.division || "Select Division"}
              onPick={() => {}}
            />
            <SelectLike
              label="District"
              value={state.location.district || "Select District"}
              onPick={() => {}}
            />
            <SelectLike
              label="Upazila"
              value={state.location.upazila || "Select Upazila"}
              onPick={() => {}}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Pourashava/Union"
              placeholder="e.g. Bogura Pourashava"
              value={state.location.pourashavaOrUnion}
              onChange={(v) => onChange({ ...state, location: { ...state.location, pourashavaOrUnion: v } })}
            />
            <Input
              label="Ward No"
              placeholder="e.g. 03"
              value={state.location.wardNo}
              onChange={(v) => onChange({ ...state, location: { ...state.location, wardNo: v } })}
            />
          </div>

          <Input
            label="Full Address"
            placeholder="Enter full address"
            value={state.location.fullAddress}
            onChange={(v) => onChange({ ...state, location: { ...state.location, fullAddress: v } })}
          />
        </div>
      </Card>
    </>
  );
}

function SectionTitle({ step, title }: { step: string; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-5 w-5 rounded-full bg-secondary border border-gray/10 flex items-center justify-center text-xs text-primary font-semibold">
        {step}
      </span>
      <p className="text-sm font-semibold text-black">{title}</p>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray">{label}</p>
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-lg border border-gray/15 bg-white px-3 text-sm text-black outline-none placeholder:text-gray"
      />
    </div>
  );
}

function SelectLike({
  label,
  value,
  onPick,
}: {
  label: string;
  value: string;
  onPick: () => void;
}) {
  return (
    <div>
      <p className="text-xs text-gray">{label}</p>
      <button
        type="button"
        onClick={onPick}
        className="mt-2 h-11 w-full rounded-lg border border-gray/15 bg-white px-3 text-sm text-black flex items-center justify-between"
      >
        <span>{value}</span>
        <ChevronDown size={16} className="text-gray" />
      </button>
    </div>
  );
}
