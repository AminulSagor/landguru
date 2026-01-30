"use client";

import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";

type OptionKey = "update" | "keep";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selected: OptionKey;
  onChangeSelected: (v: OptionKey) => void;

  onNext: () => void; // when Update Price selected
  onKeepSubmit: () => void; // when Keep as it is selected
};

export default function ResellOptionsDialog({
  open,
  onOpenChange,
  selected,
  onChangeSelected,
  onNext,
  onKeepSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} position="center" size="lg">
      <div className="space-y-6 px-4">
        {/* header */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-extrabold text-gray">
            Resell this property
          </h3>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-extrabold text-gray">Choose a option</p>

          <OptionCard
            active={selected === "update"}
            title="Update Price"
            desc="Configure the price of the property"
            onClick={() => onChangeSelected("update")}
          />

          <OptionCard
            active={selected === "keep"}
            title="Keep as it is"
            desc="List the post without updating the price"
            onClick={() => onChangeSelected("keep")}
          />
        </div>

        <div className="pt-2">
          {selected === "update" ? (
            <Button
              className="w-full"
              onClick={onNext}
            >
              Next <span className="ml-1">→</span>
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={onKeepSubmit}
            >
              List as a Sell Post
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
}

function OptionCard({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border p-5 transition ${
        active
          ? "border-primary bg-primary/10"
          : "border-gray/15 bg-white hover:bg-secondary/60"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* radio */}
        <div
          className={`mt-1 h-6 w-6 rounded-full border flex items-center justify-center ${
            active ? "border-primary" : "border-gray/25"
          }`}
        >
          {active ? <div className="h-3 w-3 rounded-full bg-primary" /> : null}
        </div>

        <div className="">
          <p className="text-base font-extrabold text-gray">{title}</p>
          <p className="mt-1 text-sm font-semibold text-gray/60">{desc}</p>
        </div>
      </div>
    </button>
  );
}
