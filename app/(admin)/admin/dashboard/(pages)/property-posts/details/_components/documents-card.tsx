"use client";

import { FileText } from "lucide-react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { PropertyDetails } from "@/app/(admin)/admin/types/property.types";

function DocTile({ name, sizeLabel }: { name: string; sizeLabel: string }) {
  return (
    <div className="border border-gray/15 rounded-lg p-4 bg-white">
      <div className="h-10 w-10 rounded-full bg-secondary border border-gray/15 flex items-center justify-center mb-3">
        <FileText size={18} className="text-primary" />
      </div>
      <p className="text-xs font-extrabold text-gray">{name}</p>
      <p className="text-xs font-semibold text-gray mt-1">{sizeLabel}</p>
    </div>
  );
}

export default function DocumentsCard({
  data,
}: {
  data: PropertyDetails["documents"];
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-gray">Documents</p>

        {/*  disabled look  when false */}
        {data.canReorganize ? (
          <Button size="sm" variant="primary">
            Reorganize Documents
          </Button>
        ) : (
          <Button
            size="sm"
            disabled
            className="bg-secondary border border-gray/15 text-gray"
          >
            Reorganize Documents
          </Button>
        )}
      </div>

      {data.sections.length === 0 ? (
        <div className="h-56 flex items-center justify-center">
          <p className="text-sm font-semibold text-gray">
            {data.emptyLabel ?? "None"}
          </p>
        </div>
      ) : (
        <div className="border border-gray/15 rounded-lg p-4 bg-white mt-4 space-y-6">
          {data.sections.map((sec) => (
            <div key={sec.title}>
              <p className="text-xs font-extrabold text-gray mb-3">
                {sec.title}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sec.items.map((d,index) => (
                  <DocTile key={index} name={d.name} sizeLabel={d.sizeLabel} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
