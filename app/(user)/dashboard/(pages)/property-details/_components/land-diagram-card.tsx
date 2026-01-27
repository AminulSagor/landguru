"use client";

import React from "react";
import Card from "@/components/cards/card";
import { Share2 } from "lucide-react";

type Props = {
  /** Google map embed url */
  mapEmbedUrl?: string;
};

const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps?q=Dhaka%20Bangladesh&output=embed";

const LandDiagramCard = ({ mapEmbedUrl }: Props) => {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Share2 className="text-primary" size={18} />
        </div>

        <h3 className="text-lg font-extrabold text-black">
          Land Shape Diagram
        </h3>
      </div>

      <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-black/5">
        <iframe
          title="Land Shape Diagram"
          src={mapEmbedUrl || DEFAULT_MAP_EMBED}
          className="w-full h-70 md:h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </Card>
  );
};

export default LandDiagramCard;
