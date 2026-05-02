"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Camera, Pencil, Lock, ArrowRight } from "lucide-react";

import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";



import {
  DIVISION_OPTIONS,
  getDistrictOptionsByDivision,
  getUpazilaOptionsByDistrict,
  DivisionKey,
  Option,
} from "@/bd-location-data/bd-address"; 
import AuthStepper from "@/components/steppers/auth-stepper";
import { HookFormTextInput } from "@/components/inputs/text-input";
import { HookFormTextareaInput } from "@/components/inputs/text-area";

export type SignUpStepFourFormValues = {
  photo: File | null;

  fullName: string;
  email: string;
  phone: string;

  division: Option | string | null;
  district: Option | string | null;
  upazila: Option | string | null;

  pouroshovaOrUnion: Option | string | null; // no data yet
  wardNo: Option | string | null; // no data yet

  postalCode: string;
  fullAddress: string;
};

type Props = {
  phone: string; // from step 1
  onNext: (data: SignUpStepFourFormValues) => void;
  onBack: () => void;
};

const normalizePhone = (v: string) => {
  if (!v) return "+880";
  if (v.startsWith("+")) return v;
  return `+${v}`;
};

const SignUpStepFour = ({ phone, onNext, onBack }: Props) => {
  const [previewUrl, setPreviewUrl] = React.useState<string>("");

  const { control, handleSubmit, setValue, watch } = useForm<SignUpStepFourFormValues>({
    defaultValues: {
      photo: null,

      fullName: "",
      email: "",
      phone: normalizePhone(phone),

      division: null,
      district: null,
      upazila: null,

      pouroshovaOrUnion: null,
      wardNo: null,

      postalCode: "",
      fullAddress: "",
    },
    mode: "onChange",
  });

  const division = watch("division");
  const district = watch("district");

  const divisionKey = React.useMemo(() => {
    if (!division) return null;
    if (typeof division === "string") return (division as DivisionKey) ?? null;
    return (division as Option).value as DivisionKey;
  }, [division]);

  const districtOptions = React.useMemo(
    () => getDistrictOptionsByDivision(divisionKey),
    [divisionKey]
  );

  const upazilaOptions = React.useMemo(() => {
    const districtVal = !district ? null : typeof district === "string" ? district : (district as Option).value;
    return getUpazilaOptionsByDistrict(districtVal ?? null);
  }, [district]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onPickPhoto = (file: File | null) => {
    setValue("photo", file);
    if (!file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
  };

  const submit = (data: SignUpStepFourFormValues) => {
    onNext(data);
  };

  return (
    <div className="py-10">
      <Card className="shadow-sm">
        <AuthStepper
          title="Create Account"
          step={4}
          totalSteps={5}
          percent={75}
          onBack={onBack}
        />

        <div className="mt-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-black text-center">
            Personal Information
          </h1>
          <p className="mt-2 text-center text-sm text-black/55">
            Please fill up your details to create your account.
          </p>

          {/* Photo uploader */}
          <div className="mt-8 flex flex-col items-center">
            <label className="cursor-pointer select-none">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onPickPhoto(e.target.files?.[0] ?? null)}
              />

              <div className="relative">
                <div className="h-24 w-24 rounded-full border-2 border-dashed border-primary flex items-center justify-center bg-white overflow-hidden">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="text-primary" size={26} />
                  )}
                </div>

                <div className="absolute -right-1 -bottom-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow">
                  <Pencil size={14} className="text-white" />
                </div>
              </div>

              <p className="mt-2 text-xs text-primary font-semibold">
                Upload Photo
              </p>
            </label>
          </div>

          <form onSubmit={handleSubmit(submit)} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <HookFormTextInput<SignUpStepFourFormValues>
                name="fullName"
                control={control}
                label="Full Name"
                rules={{ required: "Full name is required" }}
                inputClassName="h-12 px-4"
              />

              <HookFormTextInput<SignUpStepFourFormValues>
                name="email"
                control={control}
                label="Email Address"
                type="email"
                rules={{ required: "Email is required" }}
                inputClassName="h-12 px-4"
              />

              <HookFormTextInput<SignUpStepFourFormValues>
                name="phone"
                control={control}
                label="Phone Number"
                disabled
                inputClassName="h-12 px-4 bg-black/5"
                endAdornment={<Lock size={16} className="text-black/30" />}
              />

              <HookFormTextInput<SignUpStepFourFormValues>
                name="district"
                control={control}
                label="District"
                placeholder={districtOptions?.[0]?.label ?? "Enter district"}
                disabled={!division}
                rules={{ required: "District is required" }}
                onChange={() => {
                  setValue("upazila", null);
                  setValue("pouroshovaOrUnion", null);
                  setValue("wardNo", null);
                }}
                inputClassName="h-12 px-4"
              />

              <HookFormTextInput<SignUpStepFourFormValues>
                name="division"
                control={control}
                label="Division"
                placeholder={DIVISION_OPTIONS?.[0]?.label ?? "Enter division"}
                rules={{ required: "Division is required" }}
                onChange={() => {
                  setValue("district", null);
                  setValue("upazila", null);
                  setValue("pouroshovaOrUnion", null);
                  setValue("wardNo", null);
                }}
                inputClassName="h-12 px-4"
              />

              <HookFormTextInput<SignUpStepFourFormValues>
                name="upazila"
                control={control}
                label="Upazila"
                placeholder={upazilaOptions?.[0]?.label ?? "Enter upazila"}
                disabled={!district}
                rules={{ required: "Upazila is required" }}
                onChange={() => {
                  setValue("pouroshovaOrUnion", null);
                  setValue("wardNo", null);
                }}
                inputClassName="h-12 px-4"
              />

              {/* Not available from your current dataset */}
              <HookFormTextInput<SignUpStepFourFormValues>
                name="pouroshovaOrUnion"
                control={control}
                label="Pouroshova/City Corp/Union"
                placeholder="Enter pouroshova or union"
                disabled
                inputClassName="h-12 px-4"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <HookFormTextInput<SignUpStepFourFormValues>
                  name="wardNo"
                  control={control}
                  label="Ward No"
                  placeholder="Enter ward no"
                  disabled
                  inputClassName="h-12 px-4"
                />

                <HookFormTextInput<SignUpStepFourFormValues>
                  name="postalCode"
                  control={control}
                  label="Postal Code"
                  inputClassName="h-12 px-4"
                />
              </div>

              <div className="md:col-span-2">
                <HookFormTextareaInput<SignUpStepFourFormValues>
                  name="fullAddress"
                  control={control}
                  label="Full Address"
                  rows={4}
                  inputClassName="min-h-[120px] resize-none px-4 py-3"
                />
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-black/45">
              (*) marks are mandatory fields
            </p>

            <div className="mt-7">
              <Button type="submit" className="w-full">
                Next <ArrowRight size={20} />
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUpStepFour;
