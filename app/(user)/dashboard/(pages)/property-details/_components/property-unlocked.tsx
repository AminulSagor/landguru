"use client";

import React from "react";
import Card from "@/components/cards/card";

const PropertyUnlocked = () => {
  return (
    <Card className="p-8 bg-primary/5">
      <h3 className="text-xl font-extrabold text-black mb-6">
        🔓 Unlocked Features
      </h3>

      <div className="space-y-6">
        <Card className="p-5">
          <p className="font-extrabold">Risk & Due Diligence Checklist</p>
          <ul className="mt-2 text-sm text-green space-y-1">
            <li>✔ Fraud detection passed</li>
            <li>✔ Ownership verified</li>
            <li>✔ Government risk checked</li>
          </ul>
        </Card>

        <Card className="p-5 h-75 flex items-center justify-center bg-primary/5">
          ▶ Property Video
        </Card>

        <Card className="p-5">
          <p className="font-extrabold">Ownership History</p>
          <ul className="mt-2 text-sm text-black/60">
            <li>Farhan (2022 - Present)</li>
            <li>Mithila Akhter (2010 - 2022)</li>
            <li>Trusted Developer (2007 - 2010)</li>
          </ul>
        </Card>
      </div>
    </Card>
  );
};

export default PropertyUnlocked;
