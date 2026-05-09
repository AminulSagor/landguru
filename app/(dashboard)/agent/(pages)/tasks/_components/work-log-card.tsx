"use client";

import React, { useCallback, useRef, useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Paperclip, FileText } from "lucide-react";
import { uploadFileWithPresign } from "@/utils/upload.utils";
import agentTaskService from "@/service/agent/agent-task.service";
import { addWorkLogSchema } from "@/schemas/agents/work-log.schema";
import toast from "react-hot-toast";
import { formatApiError } from "@/lib/format-api-error";
import type { UiWorkLogEntry } from "@/types/agent/task.types";

function LogItem({
  time,
  title,
  fileUrls,
}: {
  time: string;
  title: string;
  fileUrls?: string[];
}) {
  return (
    <div className="relative pl-7">
      <div className="absolute left-1 top-2 h-full w-[2px] bg-gray/10" />
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-primary bg-white" />

      <p className="text-[11px] font-semibold text-gray/40">{time}</p>
      <p className="mt-1 text-sm font-extrabold text-gray">{title}</p>

      {fileUrls && fileUrls.length > 0
        ? fileUrls.map((url, idx) => {
            const fileName = String(url).split("/").pop() ?? url;
            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 rounded-lg border border-gray/10 bg-white px-3 py-3 flex items-start gap-3 hover:border-primary/30 hover:shadow-sm transition cursor-pointer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <FileText size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-gray">{fileName}</p>
                </div>
              </a>
            );
          })
        : null}
    </div>
  );
}

type Props = {
  assignmentId: string;
  existingEntries?: UiWorkLogEntry[];
  onAdded?: () => void;
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function WorkLogCard({ assignmentId, existingEntries, onAdded }: Props) {
  const [remark, setRemark] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<number, number>>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAttach = useCallback(() => inputRef.current?.click(), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selected);
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (uploading) return;
    if (!remark.trim() && files.length === 0) {
      toast.error("Add a remark or attach at least one file.");
      return;
    }

    setUploading(true);
    try {
      let fileUrls: string[] = [];

      if (files.length > 0) {
        const results = await Promise.all(
          files.map((file, idx) =>
            uploadFileWithPresign({
              file,
              type: "DEED",
              onProgress: (p) => setProgress((prev) => ({ ...prev, [idx]: p })),
            }),
          ),
        );

        fileUrls = results.map((r) => r.fileUrl);
      }

      const payload = {
        remark: remark.trim() || undefined,
        fileUrls: fileUrls.length ? fileUrls : undefined,
      };

      const parsed = addWorkLogSchema.safeParse(payload);
      if (!parsed.success) {
        const err = parsed.error.errors.map((e) => e.message).join("; ");
        throw new Error(err || "Validation failed");
      }

      await agentTaskService.addWorkLog(assignmentId, payload);
      toast.success("Work log posted");
      setRemark("");
      setFiles([]);
      setProgress({});
      onAdded?.();
    } catch (err: any) {
      console.error("Failed to post work log", err);
      toast.error(formatApiError(err).message || err.message || "Failed to post work log");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="rounded-2xl p-5">
      <h3 className="text-sm font-extrabold text-gray">Work Log</h3>

      <div className="mt-4">
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Add Remark..."
          className="mt-3 w-full min-h-[96px] rounded-lg border border-gray/10 bg-white px-4 py-3 text-sm font-semibold text-gray/40"
        />

        <input ref={inputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleAttach}
            className="flex items-center gap-2 rounded-lg border border-gray/15 bg-white px-3 py-2 text-xs font-extrabold text-gray/60 hover:bg-secondary"
          >
            <Paperclip size={14} />
            Attach
          </button>

          <Button className="px-5 py-2 text-sm" onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Posting..." : "Post Update →"}
          </Button>
        </div>

        {files.length > 0 ? (
          <div className="mt-3 space-y-2">
            {files.map((f, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 rounded-lg border border-gray/10 bg-white px-3 py-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <FileText size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-gray">{f.name}</p>
                    <p className="mt-1 text-xs font-semibold text-gray/40">{formatBytes(f.size)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-extrabold text-gray/40">{progress[idx] ? `${progress[idx]}%` : "Ready"}</div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-xs font-extrabold text-pumpkin"
                    disabled={uploading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Existing work log timeline from API */}
      {existingEntries && existingEntries.length > 0 ? (
        <div className="mt-6 border-t border-gray/10 pt-5 space-y-5">
          <h4 className="text-xs font-extrabold text-gray/60 uppercase tracking-wider">Activity</h4>
          {existingEntries.map((entry, idx) => (
            <LogItem
              key={idx}
              time={entry.createdAt}
              title={entry.title}
              fileUrls={entry.fileUrls}
            />
          ))}
        </div>
      ) : null}
    </Card>
  );
}

