"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { ArrowRight, Camera, UploadCloud, IdCard } from "lucide-react";
import AuthStepper from "@/components/steppers/auth-stepper";
import CircleLoader from "@/components/loaders/circle-loader";

export type SignUpStepFivePayload = {
  nidFront: File | null;
  nidBack: File | null;
  tin: File | null;
  skipped: boolean;
};

type Props = {
  onBack: () => void;
  onComplete: (data: SignUpStepFivePayload) => Promise<void> | void;
  onSkip: () => Promise<void> | void;
  isSubmitting?: boolean;
};

const MAX_TIN_MB = 3;
const MAX_TIN_BYTES = MAX_TIN_MB * 1024 * 1024;

function bytesToMb(bytes: number) {
  return Math.round((bytes / 1024 / 1024) * 10) / 10;
}

const isAllowedTinType = (file: File) => {
  const t = file.type.toLowerCase();
  return (
    t === "application/pdf" ||
    t === "image/png" ||
    t === "image/jpeg" ||
    t === "image/jpg"
  );
};

const SignUpStepFive = ({ onBack, onComplete, onSkip, isSubmitting = false }: Props) => {
  const [nidFront, setNidFront] = React.useState<File | null>(null);
  const [nidBack, setNidBack] = React.useState<File | null>(null);
  const [tin, setTin] = React.useState<File | null>(null);

  const [nidFrontUrl, setNidFrontUrl] = React.useState("");
  const [nidBackUrl, setNidBackUrl] = React.useState("");
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    return () => {
      if (nidFrontUrl) URL.revokeObjectURL(nidFrontUrl);
      if (nidBackUrl) URL.revokeObjectURL(nidBackUrl);
    };
  }, [nidFrontUrl, nidBackUrl]);

  const pickNid = (side: "front" | "back", file: File | null) => {
    setError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("NID must be an image (JPG/PNG).");
      return;
    }

    const url = URL.createObjectURL(file);

    if (side === "front") {
      if (nidFrontUrl) URL.revokeObjectURL(nidFrontUrl);
      setNidFront(file);
      setNidFrontUrl(url);
    } else {
      if (nidBackUrl) URL.revokeObjectURL(nidBackUrl);
      setNidBack(file);
      setNidBackUrl(url);
    }
  };

  const pickTin = (file: File | null) => {
    setError("");
    if (!file) return;

    if (!isAllowedTinType(file)) {
      setError("TIN must be PDF, JPG or PNG.");
      return;
    }
    if (file.size > MAX_TIN_BYTES) {
      setError(`TIN file too large (${bytesToMb(file.size)}MB). Max ${MAX_TIN_MB}MB.`);
      return;
    }

    setTin(file);
  };

  const submit = () => {
    setError("");
    onComplete({ nidFront, nidBack, tin, skipped: false });
  };

  return (
    <div className="py-10">
      <Card className="shadow-sm rounded-xl md:min-w-xl">
        {/* top header row: title + skip */}
        <div className="relative">
          <button
            type="button"
            onClick={onSkip}
            disabled={isSubmitting}
            className="absolute right-0 top-0 text-sm font-semibold text-primary hover:opacity-80"
          >
            Skip
          </button>

          <AuthStepper
            title="Create Account"
            step={5}
            totalSteps={5}
            percent={100}
            onBack={onBack}
            className="pr-12"
          />
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-extrabold text-black">
            Verify your identity
          </h1>
          <p className="mt-2 text-sm leading-6 text-black/55">
            To buy or sell land securely, we need to verify your identity.
          </p>

          {/* NID title */}
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-black/80">
            <IdCard size={16} className="text-primary" />
            <span>National ID (NID)</span>
          </div>

          {/* NID upload cards */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NidUploadBox
              title="Front Side"
              subtitle="Tap to Upload"
              previewUrl={nidFrontUrl}
              onPick={(file) => pickNid("front", file)}
              onClear={() => {
                setNidFront(null);
                if (nidFrontUrl) URL.revokeObjectURL(nidFrontUrl);
                setNidFrontUrl("");
              }}
            />

            <NidUploadBox
              title="Back Side"
              subtitle="Tap to Upload"
              previewUrl={nidBackUrl}
              onPick={(file) => pickNid("back", file)}
              onClear={() => {
                setNidBack(null);
                if (nidBackUrl) URL.revokeObjectURL(nidBackUrl);
                setNidBackUrl("");
              }}
            />
          </div>

          {/* TIN title */}
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-black/80">
            <UploadCloud size={16} className="text-primary" />
            <span>TIN Certificate (Optional)</span>
          </div>

          {/* TIN upload bar */}
          <TinUploadBar
            file={tin}
            onPick={pickTin}
            onClear={() => setTin(null)}
          />

          {error && (
            <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
          )}

          <div className="mt-8">
            <Button
              type="button"
              className="w-full"
              onClick={submit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircleLoader />
              ) : (
                <>
                  Complete Registration <ArrowRight size={20} />
                </>
              )}
            </Button>

            <p className="mt-3 text-center text-xs text-black/45">
              By registering, you agree to our Terms &amp; Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUpStepFive;

// ---------------------------
// Small UI helpers
// ---------------------------

function NidUploadBox({
  title,
  subtitle,
  previewUrl,
  onPick,
  onClear,
}: {
  title: string;
  subtitle: string;
  previewUrl: string;
  onPick: (file: File | null) => void;
  onClear: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />

      <div className="rounded-xl border-2 border-dashed border-primary/40 bg-white px-5 py-6 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <Camera className="text-primary" size={20} />
          )}
        </div>

        <p className="mt-3 text-sm font-semibold text-black/80">{title}</p>
        <p className="mt-1 text-xs text-black/45">{subtitle}</p>

        {previewUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }}
            className="mt-3 text-xs font-semibold text-primary hover:opacity-80"
          >
            Remove
          </button>
        )}
      </div>
    </label>
  );
}

function TinUploadBar({
  file,
  onPick,
  onClear,
}: {
  file: File | null;
  onPick: (file: File | null) => void;
  onClear: () => void;
}) {
  return (
    <label className="mt-3 block cursor-pointer">
      <input
        type="file"
        accept="application/pdf,image/png,image/jpeg"
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />

      <div className="rounded-xl border border-black/10 bg-black/5 px-4 py-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center border border-black/10">
          <UploadCloud size={16} className="text-black/50" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-black/70">
            {file ? file.name : "Tap to upload Certificate"}
          </p>
          <p className="text-xs text-black/45">PDF, JPG or PNG (Max 3MB)</p>
        </div>

        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }}
            className="text-xs font-semibold text-primary hover:opacity-80"
          >
            Remove
          </button>
        )}
      </div>
    </label>
  );
}
