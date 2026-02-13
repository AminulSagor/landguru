"use client";

import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { CircleAlert, Lock, Unlock } from "lucide-react";

const PropertyLocked = ({ onUnlock }: { onUnlock: () => void }) => {
  return (
    <div className="p-5 rounded-xl bg-secondary/80">
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="flex items-center gap-4">
          <Lock className="text-primary" />
          <h3 className="text-xl font-extrabold text-black">Locked Features</h3>
        </div>

        <span className="text-gray">
          <CircleAlert size={18} />
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          "Risk & Due Diligence",
          "Property Video",
          "Ownership History",
          "Validated Legal Documents",
          "Pentagraph Map",
          "Services Taken",
        ].map((t) => (
          <Card key={t} className="p-5">
            <p className="font-extrabold text-black">{t}</p>
            <p className="text-sm text-black/50 mt-1">
              Unlock to access this feature
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button onClick={onUnlock} className="w-full">
          <Unlock size={18} /> Unlock All Features at ৳4000
        </Button>
        <p className="mt-5 text-center text-sm text-gray">
          Pay one time fee to unlock the above features. All posts will be
          unlocked afterwards.
        </p>
      </div>
    </div>
  );
};

export default PropertyLocked;
