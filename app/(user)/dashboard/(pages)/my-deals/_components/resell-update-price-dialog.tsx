"use client";

import { useMemo, useState } from "react";
import Dialog from "@/components/dialogs/dialog";
import Button from "@/components/buttons/button";
import { ArrowLeft, ChevronDown } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onBack: () => void;
  onSubmit: (payload: {
    landSize: number;
    unit: string;
    pricePerKatha: number;
  }) => void;

  // defaults (from property)
  landSize: number; // 5
  previousPriceText: string; // "৳ 40,00,000"
};

export default function ResellUpdatePriceDialog({
  open,
  onOpenChange,
  onBack,
  onSubmit,
  landSize,
  previousPriceText,
}: Props) {
  const [unit, setUnit] = useState<"Katha">("Katha");
  const [pricePerKatha, setPricePerKatha] = useState<number>(800000);

  const askingPrice = useMemo(() => {
    const total = (landSize || 0) * (pricePerKatha || 0);
    return total;
  }, [landSize, pricePerKatha]);

  const fmt = (n: number) => {
    try {
      return n.toLocaleString("en-IN");
    } catch {
      return String(n);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="lg" position="center">
      <div className="space-y-5">
        {/* top bar (back + close) */}
        <div className="flex items-center justify-between">
          <button
            className="inline-flex items-center gap-2 text-sm font-extrabold text-gray hover:text-gray/80"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Resell this property
          </button>
        </div>

        {/* selected option card */}
        <div className="rounded-2xl border border-primary bg-primary/10 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-6 w-6 rounded-full border border-primary flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>

            <div>
              <p className="text-sm font-extrabold text-gray">Update Price</p>
              <p className="text-xs font-semibold text-gray/60">
                Configure the price of the property
              </p>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-extrabold text-gray">
              Land Size <span className="text-primary">*</span>
            </p>

            <div className="mt-2 grid grid-cols-12 gap-3">
              <div className="col-span-7">
                <div className="h-12 rounded-xl bg-secondary border border-gray/10 px-4 flex items-center text-gray/60 font-extrabold">
                  {landSize.toFixed(3)}
                </div>
              </div>

              <div className="col-span-5">
                <button className="h-12 w-full rounded-xl bg-white border border-gray/15 px-4 flex items-center justify-between font-extrabold text-primary">
                  {unit}
                  <ChevronDown size={18} className="text-gray/50" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-extrabold text-gray">
              Price Per Katha <span className="text-primary">*</span>
            </p>

            <div className="mt-2 h-12 rounded-xl bg-white border border-gray/15 px-4 flex items-center gap-2">
              <span className="text-primary font-extrabold">৳</span>
              <input
                value={String(pricePerKatha)}
                onChange={(e) => setPricePerKatha(Number(e.target.value || 0))}
                className="w-full outline-none bg-transparent font-extrabold text-primary"
              />
            </div>
          </div>

          {/* asking price box */}
          <div className="rounded-2xl border border-primary/25 bg-primary/10 p-5 text-center">
            <p className="text-xs font-extrabold text-gray/70">Asking Price</p>
            <p className="mt-2 text-3xl font-extrabold text-primary">
              ৳ {fmt(askingPrice)}
            </p>
          </div>

          <p className="text-xs font-semibold text-gray/60">
            Previous Price{" "}
            <span className="ml-2 font-extrabold text-primary">
              {previousPriceText}
            </span>
          </p>
        </div>

        <Button
          className="w-full"
          onClick={() => onSubmit({ landSize, unit, pricePerKatha })}
        >
          Update &amp; List as a Sell Post
        </Button>
      </div>
    </Dialog>
  );
}
