"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  ImagePlus,
  Video,
  FileText,
  Info,
  X,
  Plus,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import Button from "@/components/buttons/button";
import { StepTwoValues } from "@/app/(user)/dashboard/types/property-sell-post";
import Card from "@/components/cards/card";
import { FaVideo } from "react-icons/fa";

type Props = {
  defaultValues?: Partial<StepTwoValues>;
  onBack: () => void;
  onNext: (data: StepTwoValues) => void;
};

const MAX_PHOTOS = 5;
const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
const MAX_DOC_SIZE = 5 * 1024 * 1024; // 5MB

function bytesToMB(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function isAllowedDoc(file: File) {
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".pdf") || name.endsWith(".docx") || name.endsWith(".doc")
  );
}

function FileRow({
  icon,
  name,
  size,
  onRemove,
}: {
  icon: React.ReactNode;
  name: string;
  size: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-secondary bg-white px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {name}
          </p>
          <p className="text-xs text-gray">{size}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary"
        aria-label="Remove file"
      >
        <X className="h-4 w-4 text-gray" />
      </button>
    </div>
  );
}

function Dropzone({
  icon,
  title,
  subtitle,
  onPick,
  accept,
  multiple,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPick: (files: FileList | null) => void;
  accept: string;
  multiple?: boolean;
}) {
  const inputId = React.useId();

  return (
    <div className="w-full">
      <input
        id={inputId}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onPick(e.target.files)}
      />

      <label
        htmlFor={inputId}
        className="cursor-pointer block rounded-2xl border-2 border-dashed border-primary/30 bg-secondary/40 px-6 py-10 text-center hover:bg-secondary/50 transition"
      >
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-white flex items-center justify-center">
          {icon}
        </div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-gray mt-1">{subtitle}</p>
      </label>
    </div>
  );
}

export default function SellPropertyStepTwoForm({
  defaultValues,
  onBack,
  onNext,
}: Props) {
  const { handleSubmit, setValue, watch } = useForm<StepTwoValues>({
    defaultValues: {
      photos: [],
      video: null,
      deedDocuments: [],
      khatianDocuments: [],
      otherDocuments: [],
      ...(defaultValues ?? {}),
    },
    mode: "onChange",
  });

  const photos = watch("photos") || [];
  const video = watch("video");
  const deedDocuments = watch("deedDocuments") || [];
  const khatianDocuments = watch("khatianDocuments") || [];
  const otherDocuments = watch("otherDocuments") || [];

  // Photo previews
  const [photoUrls, setPhotoUrls] = React.useState<string[]>([]);

  React.useEffect(() => {
    // revoke old
    photoUrls.forEach((u) => URL.revokeObjectURL(u));

    const next = photos.map((f) => URL.createObjectURL(f));
    setPhotoUrls(next);

    return () => {
      next.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.map((p) => p.name).join("|")]);

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files);

    const remaining = Math.max(0, MAX_PHOTOS - photos.length);
    const picked = list.slice(0, remaining);

    setValue("photos", [...photos, ...picked], { shouldValidate: true });
  };

  const removePhoto = (idx: number) => {
    const next = photos.filter((_, i) => i !== idx);
    setValue("photos", next, { shouldValidate: true });
  };

  const setVideoFile = (files: FileList | null) => {
    const file = files?.[0] ?? null;
    if (!file) return setValue("video", null, { shouldValidate: true });

    // size check
    if (file.size > MAX_VIDEO_SIZE) {
      // keep it simple (no toast dependency)
      alert("Video too large. Max size is 500MB.");
      return;
    }

    setValue("video", file, { shouldValidate: true });
  };

  const addDocs = (
    key: "deedDocuments" | "khatianDocuments" | "otherDocuments",
    files: FileList | null,
  ) => {
    if (!files) return;

    const list = Array.from(files)
      .filter((f) => isAllowedDoc(f))
      .filter((f) => {
        if (f.size <= MAX_DOC_SIZE) return true;
        return false;
      });

    const existing = watch(key) || [];
    setValue(key, [...existing, ...list], { shouldValidate: true });

    // warn if some were ignored
    const ignoredType = Array.from(files).some((f) => !isAllowedDoc(f));
    const ignoredSize = Array.from(files).some((f) => f.size > MAX_DOC_SIZE);
    if (ignoredType) alert("Only PDF/DOC/DOCX files are allowed.");
    if (ignoredSize) alert("Some files were ignored (max size 5MB).");
  };

  const removeDoc = (
    key: "deedDocuments" | "khatianDocuments" | "otherDocuments",
    idx: number,
  ) => {
    const next = (watch(key) || []).filter((_, i) => i !== idx);
    setValue(key, next, { shouldValidate: true });
  };

  const submit = (data: StepTwoValues) => {
    onNext(data);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submit)} className="space-y-10">
        <Card className="rounded-xl space-y-7">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Property Visuals
            </h2>
            <p className="mt-2 text-sm text-gray">
              Upload photos & video tour to attract buyers
            </p>
          </div>
          {/* Photos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImagePlus className="h-6 w-6 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Property Photos <span className="text-primary">*</span>
              </p>
            </div>

            <Dropzone
              icon={<ImagePlus className="h-6 w-6 text-primary" />}
              title="Add Photos"
              subtitle={`Max ${MAX_PHOTOS} Photos`}
              accept="image/*"
              multiple
              onPick={addPhotos}
            />

            {/* Thumbnails grid */}
            {(photos.length > 0 || photos.length < MAX_PHOTOS) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photoUrls.map((src, idx) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-2xl border border-secondary bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`photo-${idx + 1}`}
                      className="h-28 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute right-2 top-2 h-8 w-8 rounded-xl bg-white/90 flex items-center justify-center hover:bg-white"
                      aria-label="Remove photo"
                    >
                      <X className="h-4 w-4 text-gray" />
                    </button>
                  </div>
                ))}

                {/* Add more tile */}
                {photos.length < MAX_PHOTOS && (
                  <AddMoreTile
                    onPick={(files) => addPhotos(files)}
                    remaining={MAX_PHOTOS - photos.length}
                  />
                )}
              </div>
            )}
          </div>

          {/* Video */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaVideo className="h-6 w-6 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Property Video <span className="text-primary">*</span>
              </p>
            </div>

            <Dropzone
              icon={<Video className="h-5 w-5 text-primary" />}
              title={video ? "Replace Video Tour" : "Add Video Tour"}
              subtitle="Max 1 file, Max size: 500MB"
              accept="video/*"
              onPick={setVideoFile}
            />

            {video && (
              <div className="rounded-xl border border-secondary bg-white px-4 py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {video.name}
                  </p>
                  <p className="text-xs text-gray">{bytesToMB(video.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setValue("video", null, { shouldValidate: true })
                  }
                  className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary"
                  aria-label="Remove video"
                >
                  <X className="h-4 w-4 text-gray" />
                </button>
              </div>
            )}
          </div>
        </Card>

        <Card className="rounded-xl">
          {/* Legal Documents */}
          <div className="space-y-5">
            <h3 className="text-xl font-extrabold text-foreground">
              Legal Documents
            </h3>

            <div className="rounded-xl border border-secondary bg-secondary px-4 py-3 flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-gray">
                Upload all raw documents of your Deeds/ Khatians. We will
                organize and verify them for you.
              </p>
            </div>

            {/* Deed section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Deed section <span className="text-primary">*</span>
                </p>
              </div>

              <div className="space-y-3">
                {deedDocuments.map((f, idx) => (
                  <FileRow
                    key={f.name + idx}
                    icon={<FileText className="h-4 w-4 text-primary" />}
                    name={f.name}
                    size={bytesToMB(f.size)}
                    onRemove={() => removeDoc("deedDocuments", idx)}
                  />
                ))}

                <DocDrop
                  label="Upload deed"
                  hint="PDF/DOCX, max size 5MB"
                  onPick={(files) => addDocs("deedDocuments", files)}
                />
              </div>
            </div>

            {/* Khatian section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Khatian section <span className="text-primary">*</span>
                </p>
              </div>

              <div className="space-y-3">
                {khatianDocuments.map((f, idx) => (
                  <FileRow
                    key={f.name + idx}
                    icon={<FileText className="h-4 w-4 text-primary" />}
                    name={f.name}
                    size={bytesToMB(f.size)}
                    onRemove={() => removeDoc("khatianDocuments", idx)}
                  />
                ))}

                <DocDrop
                  label="Upload Khatian"
                  hint="PDF/DOCX, max size 5MB"
                  onPick={(files) => addDocs("khatianDocuments", files)}
                />
              </div>
            </div>

            {/* Other documents */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Other documents
                </p>
              </div>

              <div className="space-y-3">
                {otherDocuments.map((f, idx) => (
                  <FileRow
                    key={f.name + idx}
                    icon={<FileText className="h-4 w-4 text-primary" />}
                    name={f.name}
                    size={bytesToMB(f.size)}
                    onRemove={() => removeDoc("otherDocuments", idx)}
                  />
                ))}

                <DocDrop
                  label="Upload other documents"
                  hint="PDF/DOCX, max size 5MB"
                  onPick={(files) => addDocs("otherDocuments", files)}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="text-center text-xs text-gray">
            (*) marks are mandatory fields
          </p>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">
              Next <ArrowRight />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function AddMoreTile({
  onPick,
  remaining,
}: {
  onPick: (files: FileList | null) => void;
  remaining: number;
}) {
  const inputId = React.useId();

  return (
    <div className="w-full">
      <input
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => onPick(e.target.files)}
      />

      <label
        htmlFor={inputId}
        className="h-28 w-full rounded-2xl border-2 border-dashed border-primary/30 bg-white flex items-center justify-center cursor-pointer hover:bg-secondary transition"
        title={`You can add ${remaining} more`}
      >
        <Plus className="h-6 w-6 text-gray" />
      </label>
    </div>
  );
}

function DocDrop({
  label,
  hint,
  onPick,
}: {
  label: string;
  hint: string;
  onPick: (files: FileList | null) => void;
}) {
  const inputId = React.useId();

  return (
    <div className="w-full">
      <input
        id={inputId}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        multiple
        onChange={(e) => onPick(e.target.files)}
      />

      <label
        htmlFor={inputId}
        className="flex items-center justify-between rounded-2xl border-2 border-dashed border-primary/30 bg-secondary px-4 py-4 cursor-pointer hover:bg-secondary/80 transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {label}
            </p>
            <p className="text-xs text-gray">{hint}</p>
          </div>
        </div>

        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center">
          <Plus className="h-5 w-5 text-primary" />
        </div>
      </label>
    </div>
  );
}
