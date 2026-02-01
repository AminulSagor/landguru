"use client";

import React from "react";
import Card from "@/components/cards/card";
import { ChevronUp, Play, FileText } from "lucide-react";

type DocItem = {
  name: string;
  size: string; // "1.5MB"
  ext: "pdf" | "docx" | "jpg" | "png";
};

type Props = {
  videoTitle?: string;
  deedDocs: DocItem[];
  khatianDocs: DocItem[];
  isVideo?: boolean;
};

export default function PropertyMediaAndLegalDocsSection({
  videoTitle = "Property Video",
  deedDocs,
  khatianDocs,
  isVideo = true,
}: Props) {
  return (
    <Card className="rounded-2xl border bg-secondary/60 p-4">
      {/* Video block */}
      {isVideo && (
        <Card className="rounded-2xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Play className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-extrabold text-gray">{videoTitle}</p>
            </div>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray/60 hover:bg-secondary"
              aria-label="Collapse"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border bg-secondary/50">
            <div className="relative h-[260px] w-full">
              <div className="absolute inset-0 bg-primary/5" />
              <button
                type="button"
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-sm active:scale-[0.98]"
                aria-label="Play video"
              >
                <Play className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Legal docs */}
      <div className="mt-6 px-1">
        <h3 className="text-base font-extrabold text-gray">Legal Documents</h3>

        <div className="mt-5 space-y-6">
          <DocsGroup title="Deed section" required items={deedDocs} />
          <DocsGroup title="Khatian section" required items={khatianDocs} />
        </div>
      </div>
    </Card>
  );
}

/* =========================
   Sub components
========================= */

function DocsGroup({
  title,
  required,
  items,
}: {
  title: string;
  required?: boolean;
  items: DocItem[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <p className="text-sm font-extrabold text-gray">
          {title} {required ? <span className="text-primary">*</span> : null}
        </p>
      </div>

      <div className="mt-3 space-y-3">
        {items.map((d, idx) => (
          <DocRow key={`${d.name}-${idx}`} doc={d} />
        ))}
      </div>
    </div>
  );
}

function DocRow({ doc }: { doc: DocItem }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="text-xs font-extrabold">{doc.ext.toUpperCase()}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold text-gray">{doc.name}</p>
        <p className="mt-0.5 text-xs text-gray/50">{doc.size}</p>
      </div>
    </div>
  );
}
