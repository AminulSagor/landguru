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
  Option,
} from "@/bd-location-data/bd-address";
import {
  BuyStepOneValues,
  PropertyType,
  Unit,
} from "@/app/(dashboard)/user/types/property-buy-post";
import Card from "@/components/cards/card";

type Props = {
  defaultValues?: Partial<BuyStepOneValues>;
  onNext: (data: BuyStepOneValues) => void;
};

const KATHA_TO_SQFT = 720;
const DECIMAL_TO_SQFT = 435.6;
const ACRE_TO_SQFT = 43560;
const BIGHA_TO_KATHA = 20;

function toSqft(value: number, unit: Unit) {
  const v = Number(value) || 0;
  return unit === "Katha" ? v * KATHA_TO_SQFT : v * DECIMAL_TO_SQFT;
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

function formatBDT(n: number) {
  if (!Number.isFinite(n)) return "৳ 0";
  try {
    return `৳ ${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
  } catch {
    return `৳ ${Math.round(n)}`;
  }
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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  );
}

function RangeRow({
  label,
  min,
  max,
  value,
  onChange,
  suffix,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs font-semibold text-primary">
          {value}
          {suffix ?? ""}
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

export default function BuyPostStepOneForm({ defaultValues, onNext }: Props) {
  const { control, handleSubmit, setValue, watch } = useForm<BuyStepOneValues>({
    defaultValues: {
      adTitle: "",
      description: "",
      propertyType: "Plain Land",

      minLandSize: 5,
      minLandUnit: "Katha",

      minPlotSize: 5,
      minPlotUnit: "Katha",

      distanceMin: 200,
      distanceMax: 750,

      budgetMin: 3000000,
      budgetMax: 4000000,

      division: null,
      district: null,
      upazila: null,
      pouroshovaOrUnion: null,
      wardNo: null,
      postalCode: "",

      ...(defaultValues ?? {}),
    },
    mode: "onChange",
  });

  const propertyType = watch("propertyType");

  const minLandSize = Number(watch("minLandSize") || 0);
  const minLandUnit = watch("minLandUnit");

  const minPlotSize = Number(watch("minPlotSize") || 0);
  const minPlotUnit = watch("minPlotUnit");

  const distanceMin = Number(watch("distanceMin") || 0);
  const distanceMax = Number(watch("distanceMax") || 0);

  const budgetMin = Number(watch("budgetMin") || 0);
  const budgetMax = Number(watch("budgetMax") || 0);

  // metrics chips (min land)
  const landSqft = toSqft(minLandSize, minLandUnit);
  const landDecimal = toDecimalFromSqft(landSqft);
  const landAcre = toAcreFromSqft(landSqft);
  const landKatha =
    minLandUnit === "Katha" ? minLandSize : landSqft / KATHA_TO_SQFT;
  const landBigha = toBighaFromKatha(landKatha);

  // metrics chips (min plot)
  const plotSqft = toSqft(minPlotSize, minPlotUnit);
  const plotDecimal = toDecimalFromSqft(plotSqft);
  const plotAcre = toAcreFromSqft(plotSqft);
  const plotKatha =
    minPlotUnit === "Katha" ? minPlotSize : plotSqft / KATHA_TO_SQFT;
  const plotBigha = toBighaFromKatha(plotKatha);

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

  const submit = (data: BuyStepOneValues) => {
    onNext({
      ...data,
      distanceMin: Math.min(data.distanceMin, data.distanceMax),
      distanceMax: Math.max(data.distanceMin, data.distanceMax),
      budgetMin: Math.min(data.budgetMin, data.budgetMax),
      budgetMax: Math.max(data.budgetMin, data.budgetMax),
    });
  };

  return (
    <Card className="rounded-xl">
      <h2 className="text-2xl font-extrabold text-foreground">
        What are you looking for?
      </h2>

      <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-10">
        {/* Title + Description */}
        <div className="space-y-5">
          <HookFormTextInput<BuyStepOneValues>
            name="adTitle"
            control={control}
            label="Ad Title *"
            rules={{ required: "Ad title is required" }}
            placeholder="E.g. 3 Bedroom Flat in Baridhara"
            inputClassName="h-12 px-4"
          />

          <HookFormTextareaInput<BuyStepOneValues>
            name="description"
            control={control}
            label="Description *"
            rules={{ required: "Description is required" }}
            placeholder="Add description about your property, purpose for buying, requirements and so on."
            rows={4}
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

        {/* Min Land + Min Plot (side by side like SS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Minimum Land Size */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Minimum Land Size *
            </p>

            <div className="grid grid-cols-[1fr_140px] gap-4">
              <HookFormTextInput<BuyStepOneValues>
                name="minLandSize"
                control={control}
                label=""
                type="number"
                rules={{ required: "Required" }}
                inputClassName="h-12 px-4"
              />
              <HookFormSingleSelect<BuyStepOneValues>
                name="minLandUnit"
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
              value={minLandSize}
              onChange={(e) => setValue("minLandSize", Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
            <div className="flex items-center justify-between text-xs text-gray">
              <span>Min</span>
              <span>Max</span>
            </div>

            <p className="text-sm font-semibold text-foreground">
              In other metrics *
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip>{Math.round(landSqft).toLocaleString()} Sqft</Chip>
              <Chip>{landDecimal.toFixed(4)} Decimal</Chip>
              <Chip>{landAcre.toFixed(4)} Acre</Chip>
              <Chip>{landBigha.toFixed(2)} Bigha</Chip>
            </div>
          </div>

          {/* Minimum Plot Size (Optional) */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Minimum Plot Size (Optional)
            </p>

            <div className="grid grid-cols-[1fr_140px] gap-4">
              <HookFormTextInput<BuyStepOneValues>
                name="minPlotSize"
                control={control}
                label=""
                type="number"
                inputClassName="h-12 px-4"
              />
              <HookFormSingleSelect<BuyStepOneValues>
                name="minPlotUnit"
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
              value={minPlotSize}
              onChange={(e) => setValue("minPlotSize", Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
            <div className="flex items-center justify-between text-xs text-gray">
              <span>Min</span>
              <span>Max</span>
            </div>

            <p className="text-sm font-semibold text-foreground">
              In other metrics *
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip>{Math.round(plotSqft).toLocaleString()} Sqft</Chip>
              <Chip>{plotDecimal.toFixed(4)} Decimal</Chip>
              <Chip>{plotAcre.toFixed(4)} Acre</Chip>
              <Chip>{plotBigha.toFixed(2)} Bigha</Chip>
            </div>
          </div>
        </div>

        {/* Distance from Road (single section like SS) */}
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
              suffix="m"
            />
            <RangeRow
              label="Max"
              min={0}
              max={2000}
              value={distanceMax}
              onChange={(v) => setValue("distanceMax", v)}
              suffix="m"
            />
          </div>
        </div>

        {/* Budget Range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Budget Range
            </p>
            <p className="text-xs font-semibold text-primary">
              {formatBDT(budgetMin)} - {formatBDT(budgetMax)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <RangeRow
              label="Min"
              min={0}
              max={50000000}
              value={budgetMin}
              onChange={(v) => setValue("budgetMin", v)}
            />
            <RangeRow
              label="Max"
              min={0}
              max={50000000}
              value={budgetMax}
              onChange={(v) => setValue("budgetMax", v)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HookFormTextInput<BuyStepOneValues>
              name="budgetMin"
              control={control}
              label=""
              type="number"
              inputClassName="h-12 px-4"
              startAdornment={
                <span className="text-primary font-semibold">৳</span>
              }
            />
            <HookFormTextInput<BuyStepOneValues>
              name="budgetMax"
              control={control}
              label=""
              type="number"
              inputClassName="h-12 px-4"
              startAdornment={
                <span className="text-primary font-semibold">৳</span>
              }
            />
          </div>
        </div>

        {/* Preferred Location */}
        <div className="space-y-6 pt-4 border-t border-secondary">
          <h3 className="text-xl font-extrabold text-foreground">
            Preferred Location
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <HookFormSingleSelect<BuyStepOneValues>
              name="division"
              control={control}
              label="Division *"
              placeholder="Select"
              options={DIVISION_OPTIONS}
              rules={{ required: "Division is required" }}
              onChange={() => {
                setValue("district", null);
                setValue("upazila", null);
                setValue("pouroshovaOrUnion", null);
                setValue("wardNo", null);
              }}
            />

            <HookFormSingleSelect<BuyStepOneValues>
              name="district"
              control={control}
              label="District *"
              placeholder="Select"
              options={districtOptions}
              disabled={!division}
              rules={{ required: "District is required" }}
              onChange={() => {
                setValue("upazila", null);
                setValue("pouroshovaOrUnion", null);
                setValue("wardNo", null);
              }}
            />

            <HookFormSingleSelect<BuyStepOneValues>
              name="upazila"
              control={control}
              label="Upazilla"
              placeholder="Select"
              options={upazilaOptions}
              disabled={!district}
            />

            <HookFormSingleSelect<BuyStepOneValues>
              name="pouroshovaOrUnion"
              control={control}
              label="Pouroshova/City Corp/Union"
              placeholder="Select"
              options={[]}
              disabled
            />

            <HookFormSingleSelect<BuyStepOneValues>
              name="wardNo"
              control={control}
              label="Ward No"
              placeholder="Select"
              options={[]}
              disabled
            />

            <HookFormTextInput<BuyStepOneValues>
              name="postalCode"
              control={control}
              label="Postal Code"
              inputClassName="h-12 px-4"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Next
        </Button>
        <p className="text-center text-xs text-gray">
          (*) marks are mandatory fields
        </p>
      </form>
    </Card>
  );
}
