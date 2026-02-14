import Card from "@/components/cards/card";
import { Upload } from "lucide-react";

export default function AgentOnboardVerification({
  verification,
  onChange,
}: {
  verification: {
    nidNumber: string;
    nidFrontFileName?: string;
    nidBackFileName?: string;
    tinNumber: string;
    tinFileName?: string;
  };
  onChange: (v: any) => void;
}) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 rounded-full bg-secondary border border-gray/10 flex items-center justify-center text-xs text-primary font-semibold">
          5
        </span>
        <p className="text-sm font-semibold text-black">Verification Documents</p>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-14 gap-4">
        {/* left fields */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          <Field
            label="National ID (NID) Number"
            placeholder="Enter NID Number (10 or 13 digit)"
            value={verification.nidNumber}
            onChange={(v) => onChange({ ...verification, nidNumber: v })}
          />

          <Field
            label="TIN Number"
            placeholder="Enter TIN Number"
            value={verification.tinNumber}
            onChange={(v) => onChange({ ...verification, tinNumber: v })}
          />
        </div>

        {/* upload boxes */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadBox title="NID Front Side" />
            <UploadBox title="NID Back Side" />
          </div>

          <div className="rounded-lg border border-dashed border-gray/20 bg-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <Upload size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black">TIN Certificate</p>
                <p className="text-xs text-gray">Upload (PDF/JPEG)</p>
              </div>
            </div>

            <button className="text-sm text-primary font-medium">Browse</button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs text-gray">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-lg border border-gray/15 bg-white px-3 text-sm text-black outline-none placeholder:text-gray"
      />
    </div>
  );
}

function UploadBox({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray/20 bg-white px-4 py-6 text-center">
      <Upload size={18} className="text-gray inline-block" />
      <p className="text-xs text-gray mt-2">{title}</p>
    </div>
  );
}
