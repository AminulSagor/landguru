"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Paperclip, FileText } from "lucide-react";

function LogItem({
  time,
  title,
  fileName,
  fileSize,
}: {
  time: string;
  title: string;
  fileName?: string;
  fileSize?: string;
}) {
  return (
    <div className="relative pl-7">
      <div className="absolute left-1 top-2 h-full w-[2px] bg-gray/10" />
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-primary bg-white" />

      <p className="text-[11px] font-semibold text-gray/40">{time}</p>
      <p className="mt-1 text-sm font-extrabold text-gray">{title}</p>

      {fileName ? (
        <div className="mt-3 rounded-lg border border-gray/10 bg-white px-3 py-3 flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <FileText size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-gray">{fileName}</p>
            <p className="mt-1 text-xs font-semibold text-gray/40">{fileSize}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function WorkLogCard() {
  return (
    <Card className="rounded-2xl p-5">
      <h3 className="text-sm font-extrabold text-gray">Work Log</h3>

      <div className="mt-4 space-y-5">
        <LogItem
          time="Today, 10:00 AM"
          title="Uploaded new verified document"
          fileName="Verified document 1.pdf"
          fileSize="1.5MB"
        />
        <LogItem time="Yesterday, 9:00 AM" title="You accepted the task" />
      </div>

      <div className="mt-5">
        <div className="rounded-lg border border-gray/10 bg-white px-4 py-3 text-sm font-semibold text-gray/40">
          Add Remark...
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-extrabold text-gray/60 hover:bg-secondary">
            <Paperclip size={14} />
            Attach
          </button>

          <Button className="px-5 py-2 text-sm">
            Post Update →
          </Button>
        </div>
      </div>
    </Card>
  );
}
