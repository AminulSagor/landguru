"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons/button";
import { HookFormTextInput } from "@/components/inputs/text-input";
import { HookFormTextareaInput } from "@/components/inputs/text-area";
import { HookFormSingleSelect } from "@/components/inputs/select/single.select";
import {
  DIVISION_OPTIONS,
  getDistrictOptionsByDivision,
  getUpazilaOptionsByDistrict,
  DivisionKey,
} from "@/bd-location-data/bd-address";
import {
  PropertyType,
  StepOneValues,
  Unit,
} from "@/app/(dashboard)/user/types/property-sell-post";
import Card from "@/components/cards/card";
import { ArrowRight } from "lucide-react";

// NOTE: Conversions below are common BD approximations (can vary by region).
// 1 katha ≈ 720 sqft, 1 decimal ≈ 435.6 sqft, 1 acre = 43,560 sqft, 1 bigha ≈ 20 katha.
const KATHA_TO_SQFT = 720;
const DECIMAL_TO_SQFT = 435.6;
const ACRE_TO_SQFT = 43560;
const BIGHA_TO_KATHA = 20;

type Props = {
  defaultValues?: Partial<StepOneValues>;
  onNext: (data: StepOneValues) => void;
  goNext: () => void;
};

function formatBDT(n: number) {
  if (!Number.isFinite(n)) return "৳ 0";
  try {
    return `৳ ${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
  } catch {
    return `৳ ${Math.round(n)}`;
  }
}

function toSqft(value: number, unit: Unit) {
  const v = Number(value) || 0;
  if (unit === "Katha") return v * KATHA_TO_SQFT;
  return v * DECIMAL_TO_SQFT;
}

function toDecimalFromSqft(sqft: number) {
  return sqft / DECIMAL_TO_SQFT;
}

function toAcreFromSqft(sqft: number) {
  return sqft / ACRE_TO_SQFT;
}

function toBighaFromKatha(katha: number) {
  return katha / BIGHA_TO_KATHA;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "h-10 rounded-lg px-4 text-sm font-medium transition-all border " +
        (active
          ? "bg-primary text-white border-primary"
          : "bg-secondary text-gray border-secondary hover:bg-secondary/80")
      }
    >
      {children}
    </button>
  );
}

function RangeRow({
  label,
  min,
  max,
  value,
  onChange,
  unitSuffix,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  unitSuffix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs font-semibold text-primary">
          {value}
          {unitSuffix ?? ""}
        </p>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-(--color-primary)"
      />

      <div className="flex items-center justify-between text-xs text-gray">
        <span>Min</span>
        <span>Max</span>
      </div>
    </div>
  );
}

export default function SellPropertyStepOneForm({
  defaultValues,
  onNext,
  goNext,
}: Props) {
  const { control, handleSubmit, watch, setValue } = useForm<StepOneValues>({
    defaultValues: {
      adTitle: "",
      description: "",

      propertyType: "Plain Land",

      distanceMin: 200,
      distanceMax: 750,

      sellableAmount: 5,
      sellableUnit: "Katha",

      plotSize: 5,
      plotSizeUnit: "Katha",

      shareUnitEnabled: false,
      shareUnitAmount: 1,
      shareUnitUnit: "Katha",

      pricePerKatha: 800000,

      division: null,
      district: null,
      upazila: null,
      pouroshovaOrUnion: null,
      wardNo: null,
      postalCode: "",
      fullAddress: "",

      ...(defaultValues ?? {}),
    },
    mode: "onChange",
  });

  const propertyType = watch("propertyType");
  const sellableAmount = Number(watch("sellableAmount") || 0);
  const sellableUnit = watch("sellableUnit");
  const plotSize = Number(watch("plotSize") || 0);
  const plotUnit = watch("plotSizeUnit");

  const distanceMin = Number(watch("distanceMin") || 0);
  const distanceMax = Number(watch("distanceMax") || 0);

  const shareUnitEnabled = !!watch("shareUnitEnabled");
  const pricePerKatha = Number(watch("pricePerKatha") || 0);

  // Asking price: based on sellable amount converted to katha
  const sellableInKatha =
    sellableUnit === "Katha"
      ? sellableAmount
      : toSqft(sellableAmount, "Decimal") / KATHA_TO_SQFT;

  const askingPrice = sellableInKatha * pricePerKatha;

  // Metrics chips for sellable amount
  const sellSqft = toSqft(sellableAmount, sellableUnit);
  const sellDecimal = toDecimalFromSqft(sellSqft);
  const sellAcre = toAcreFromSqft(sellSqft);
  const sellBigha = toBighaFromKatha(sellableInKatha);

  // Location chaining
  const division = watch("division");
  const district = watch("district");
  const divisionKey = (division?.value as DivisionKey) ?? null;

  const districtOptions = React.useMemo(
    () => getDistrictOptionsByDivision(divisionKey),
    [divisionKey],
  );

  const upazilaOptions = React.useMemo(
    () => getUpazilaOptionsByDistrict(district?.value ?? null),
    [district],
  );

  const submit = (data: StepOneValues) => {
    console.log(data);
    const min = Math.min(data.distanceMin, data.distanceMax);
    const max = Math.max(data.distanceMin, data.distanceMax);
    onNext({ ...data, distanceMin: min, distanceMax: max });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submit)} className="space-y-10">
        <Card className="rounded-xl space-y-8">
          <h2 className="text-2xl font-semibold text-foreground">
            What are you selling?
          </h2>
          {/* Title + Description */}
          <div className="space-y-5">
            <HookFormTextInput<StepOneValues>
              name="adTitle"
              control={control}
              label="Ad Title"
              rules={{ required: "Ad title is required" }}
              placeholder="E.g. 3 Bedroom Flat in Baridhara"
              inputClassName="h-12 px-4"
            />

            <HookFormTextareaInput<StepOneValues>
              name="description"
              control={control}
              label="Description"
              rules={{ required: "Description is required" }}
              placeholder="Add description about your property, purpose for selling, new features and so on."
              rows={5}
              inputClassName="min-h-[140px] resize-none px-4 py-3"
            />
          </div>

          {/* Property type */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Property Type *
            </p>
            <div className="flex flex-wrap gap-3">
              {(
                [
                  "Plain Land",
                  "Flat",
                  "Commercial",
                  "Water Land",
                  "Agro Land",
                  "Blank Roof",
                ] as PropertyType[]
              ).map((t) => (
                <Pill
                  key={t}
                  active={propertyType === t}
                  onClick={() => setValue("propertyType", t)}
                >
                  {t}
                </Pill>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                Distance From Road
              </p>
              <p className="text-xs font-semibold text-primary">
                {distanceMin}m–{distanceMax}m
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <RangeRow
                label="Min"
                min={0}
                max={2000}
                value={distanceMin}
                onChange={(v) => setValue("distanceMin", v)}
                unitSuffix="m"
              />
              <RangeRow
                label="Max"
                min={0}
                max={2000}
                value={distanceMax}
                onChange={(v) => setValue("distanceMax", v)}
                unitSuffix="m"
              />
            </div>
          </div>

          {/* Sellable land amount */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Sellable Land Amount *
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
              <HookFormTextInput<StepOneValues>
                name="sellableAmount"
                control={control}
                label=""
                rules={{ required: "Required" }}
                type="number"
                inputClassName="h-12 px-4"
              />

              <HookFormSingleSelect<StepOneValues>
                name="sellableUnit"
                control={control}
                label=""
                placeholder="Select"
                options={[
                  { label: "Katha", value: "Katha" },
                  { label: "Decimal", value: "Decimal" },
                ]}
              />
            </div>

            <input
              type="range"
              min={0}
              max={200}
              step={0.1}
              value={sellableAmount}
              onChange={(e) =>
                setValue("sellableAmount", Number(e.target.value))
              }
              className="w-full accent-(--color-primary)"
            />

            <div className="flex items-center justify-between text-xs text-gray">
              <span>Min</span>
              <span>Max</span>
            </div>

            <div className="pt-2">
              <p className="text-sm font-semibold text-foreground">
                In other metrics *
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip>{Math.round(sellSqft).toLocaleString()} Sqft</Chip>
                <Chip>{sellDecimal.toFixed(4)} Decimal</Chip>
                <Chip>{sellAcre.toFixed(4)} Acre</Chip>
                <Chip>{sellBigha.toFixed(2)} Bigha</Chip>
              </div>
            </div>
          </div>

          {/* Plot size (optional) */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Plot Size (Optional)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
              <HookFormTextInput<StepOneValues>
                name="plotSize"
                control={control}
                label=""
                type="number"
                inputClassName="h-12 px-4"
              />

              <HookFormSingleSelect<StepOneValues>
                name="plotSizeUnit"
                control={control}
                label=""
                placeholder="Select"
                options={[
                  { label: "Katha", value: "Katha" },
                  { label: "Decimal", value: "Decimal" },
                ]}
              />
            </div>

            <input
              type="range"
              min={0}
              max={200}
              step={0.1}
              value={plotSize}
              onChange={(e) => setValue("plotSize", Number(e.target.value))}
              className="w-full accent-(--color-primary)"
            />

            <div className="flex items-center justify-between text-xs text-gray">
              <span>Min</span>
              <span>Max</span>
            </div>

            <div className="pt-2">
              <p className="text-sm font-semibold text-foreground">
                In other metrics *
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(() => {
                  const sqft = toSqft(plotSize, plotUnit);
                  const katha =
                    plotUnit === "Katha" ? plotSize : sqft / KATHA_TO_SQFT;

                  return (
                    <>
                      <Chip>{Math.round(sqft).toLocaleString()} Sqft</Chip>
                      <Chip>{toDecimalFromSqft(sqft).toFixed(4)} Decimal</Chip>
                      <Chip>{toAcreFromSqft(sqft).toFixed(4)} Acre</Chip>
                      <Chip>{toBighaFromKatha(katha).toFixed(2)} Bigha</Chip>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Share unit */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 text-sm font-semibold text-foreground">
              <input
                type="checkbox"
                checked={shareUnitEnabled}
                onChange={(e) => setValue("shareUnitEnabled", e.target.checked)}
                className="h-4 w-4 accent-(--color-primary)"
              />
              Share Unit
            </label>

            <div className={shareUnitEnabled ? "opacity-100" : "opacity-50"}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
                <HookFormTextInput<StepOneValues>
                  name="shareUnitAmount"
                  control={control}
                  label=""
                  type="number"
                  disabled={!shareUnitEnabled}
                  inputClassName={
                    "h-12 px-4 " + (!shareUnitEnabled ? "bg-secondary" : "")
                  }
                />

                <HookFormSingleSelect<StepOneValues>
                  name="shareUnitUnit"
                  control={control}
                  label=""
                  placeholder="Select"
                  options={[
                    { label: "Katha", value: "Katha" },
                    { label: "Decimal", value: "Decimal" },
                  ]}
                  disabled={!shareUnitEnabled}
                />
              </div>

              <input
                type="range"
                min={0}
                max={50}
                step={0.1}
                value={Number(watch("shareUnitAmount") || 0)}
                onChange={(e) =>
                  setValue("shareUnitAmount", Number(e.target.value))
                }
                disabled={!shareUnitEnabled}
                className="w-full accent-(--color-primary)"
              />

              <div className="flex items-center justify-between text-xs text-gray">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>
          </div>

          {/* Price per katha */}
          <div className="space-y-3">
            <HookFormTextInput<StepOneValues>
              name="pricePerKatha"
              control={control}
              label="Price Per Katha"
              rules={{ required: "Price is required" }}
              type="number"
              // If your text input supports startAdornment, keep it.
              // If not, tell me the prop name you use and I’ll adjust.
              startAdornment={
                <span className="text-primary font-semibold">৳</span>
              }
              inputClassName="h-12 px-4"
            />

            <div className="rounded-xl border border-secondary bg-secondary p-6 text-center">
              <p className="text-sm font-semibold text-foreground">
                Asking Price
              </p>
              <p className="mt-2 text-3xl font-extrabold text-primary">
                {formatBDT(askingPrice)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl">
          {/* Location */}
          <div className="space-y-5">
            <h3 className="text-xl font-extrabold text-foreground">Location</h3>

            <HookFormSingleSelect<StepOneValues>
              name="division"
              control={control}
              label="Division"
              placeholder="Select your division"
              options={DIVISION_OPTIONS}
              rules={{ required: "Division is required" }}
              onChange={() => {
                setValue("district", null);
                setValue("upazila", null);
                setValue("pouroshovaOrUnion", null);
                setValue("wardNo", null);
              }}
            />

            <HookFormSingleSelect<StepOneValues>
              name="district"
              control={control}
              label="District"
              placeholder="Select your district"
              options={districtOptions}
              disabled={!division}
              rules={{ required: "District is required" }}
              onChange={() => {
                setValue("upazila", null);
                setValue("pouroshovaOrUnion", null);
                setValue("wardNo", null);
              }}
            />

            <HookFormSingleSelect<StepOneValues>
              name="upazila"
              control={control}
              label="Upazila"
              placeholder="Select your upazila"
              options={upazilaOptions}
              disabled={!district}
              rules={{ required: "Upazila is required" }}
              onChange={() => {
                setValue("pouroshovaOrUnion", null);
                setValue("wardNo", null);
              }}
            />

            {/* Not available from current dataset */}
            <HookFormSingleSelect<StepOneValues>
              name="pouroshovaOrUnion"
              control={control}
              label="Pouroshova/City Corp/Union *"
              placeholder="Select your Pouroshova/City Corp"
              options={[]}
              disabled
              rules={{ required: "Required" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <HookFormSingleSelect<StepOneValues>
                name="wardNo"
                control={control}
                label="Ward No"
                placeholder="Select Ward No"
                options={[]}
                disabled
                rules={{ required: "Required" }}
              />

              <HookFormTextInput<StepOneValues>
                name="postalCode"
                control={control}
                label="Postal Code"
                inputClassName="h-12 px-4"
              />
            </div>

            <HookFormTextareaInput<StepOneValues>
              name="fullAddress"
              control={control}
              label="Full Address"
              rules={{ required: "Full address is required" }}
              rows={4}
              placeholder="Holding #45, Ward #03, Bogura Pourashava, Bogura Sadar, Bogura-5800, Rajshahi"
              inputClassName="min-h-[120px] resize-none px-4 py-3"
            />
          </div>
        </Card>

        <Button type="submit" className="w-full" onClick={goNext}>
          Next <ArrowRight size={20} />
        </Button>

        <p className="text-center text-sm text-gray">
          (*) marks are mandatory fields
        </p>
      </form>
    </div>
  );
}
