import { CheckCircle2, X } from "lucide-react";

export default function BulkActionBar({
  open,
  count,
  onClear,
  onTurnOn,
  onTurnOff,
}: {
  open: boolean;
  count: number;
  onClear: () => void;
  onTurnOn: () => void;
  onTurnOff: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 rounded-2xl border border-gray/15 bg-white px-4 py-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-semibold">
            {count}
          </div>
          <p className="text-sm font-semibold text-primary">
            Administrators Selected
          </p>
        </div>

        <button
          type="button"
          onClick={onTurnOn}
          className="inline-flex items-center gap-2 rounded-lg bg-green px-4 py-2 text-sm font-semibold text-white"
        >
          <CheckCircle2 className="h-4 w-4" />
          Turn On
        </button>

        <button
          type="button"
          onClick={onTurnOff}
          className="inline-flex items-center gap-2 rounded-lg bg-gray px-4 py-2 text-sm font-semibold text-white"
        >
          <span className="h-4 w-4 rounded-full border border-white/60 flex items-center justify-center">
            ×
          </span>
          Turn Off
        </button>

        <button type="button" onClick={onClear} className="text-gray hover:text-primary" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
