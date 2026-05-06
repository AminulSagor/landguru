"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";

import { HookFormSingleSelect } from "@/components/inputs/select/single.select";
import { HookFormTextInput } from "@/components/inputs/text-input";
import {
  DIVISION_OPTIONS,
  getDistrictOptionsByDivision,
  getUpazilaOptionsByDistrict,
  DivisionKey,
} from "@/bd-location-data/bd-address";
import { ListFilter } from "lucide-react";
import {
  type Option,
} from "@/types/property/property-filters.types";
import { usePropertyFilters } from "@/app/(dashboard)/user/(pages)/properties/_components/property-filters.context";

type FiltersForm = {
  division: Option | null;
  district: Option | null;
  upazila: Option | null;
  pouroshovaOrUnion: string;
  wardNo: string;
  minPrice: string;
  maxPrice: string;
};

const PROPERTY_TYPES = [
  "All",
  "Plain Land",
  "Flat",
  "Commercial",
  "Water Land",
  "Agro Land",
] as const;

export default function PropertyFilters() {
  const { filters, updateFilters, resetFilters } = usePropertyFilters();

  const [activeType, setActiveType] = React.useState<
    (typeof PROPERTY_TYPES)[number]
  >(filters.propertyType as (typeof PROPERTY_TYPES)[number]);

  // slider UI state (visual like SS)
  const [price, setPrice] = React.useState<[number, number]>(
    filters.priceRange,
  ); // lakh
  const [sellable, setSellable] = React.useState<[number, number]>(
    filters.sellableRange,
  ); // katha
  const [plot, setPlot] = React.useState<[number, number]>(filters.plotRange); // katha
  const [road, setRoad] = React.useState<[number, number]>(filters.roadRange); // meters

  const { control, reset, getValues, watch, setValue } =
    useForm<FiltersForm>({
    defaultValues: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
      pouroshovaOrUnion: filters.pouroshovaOrUnion,
      wardNo: filters.wardNo,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    },
      mode: "onChange",
    });

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

  React.useEffect(() => {
    setActiveType(filters.propertyType as (typeof PROPERTY_TYPES)[number]);
    setPrice(filters.priceRange);
    setSellable(filters.sellableRange);
    setPlot(filters.plotRange);
    setRoad(filters.roadRange);
    reset({
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
      pouroshovaOrUnion: filters.pouroshovaOrUnion,
      wardNo: filters.wardNo,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
  }, [filters, reset]);

  const resetAll = () => {
    resetFilters();
  };

  const applyFilters = () => {
    const values = getValues();
    updateFilters({
      propertyType: activeType,
      priceRange: price,
      sellableRange: sellable,
      plotRange: plot,
      roadRange: road,
      division: values.division,
      district: values.district,
      upazila: values.upazila,
      pouroshovaOrUnion: values.pouroshovaOrUnion,
      wardNo: values.wardNo,
      minPrice: values.minPrice,
      maxPrice: values.maxPrice,
    });
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>
            <ListFilter size={18} />
          </span>

          <h3 className="text-base font-extrabold text-black">Filters</h3>
        </div>

        <button
          type="button"
          onClick={resetAll}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Reset All
        </button>
      </div>

      <div className="mt-5 space-y-6">
        {/* Property Type */}
        <div>
          <p className="text-sm font-extrabold text-black">Property Type</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((t) => {
              const active = t === activeType;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className={[
                    "h-9 rounded-full px-4 text-xs font-bold transition border",
                    active
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-black/10 text-black/70 hover:bg-black/5",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <RangeRow
          label="Price Range"
          value={`৳ ${toBDT(price[0])} - ৳ ${toBDT(price[1])}`}
        >
          <DoubleSlider
            min={0}
            max={500}
            step={1}
            value={price}
            onChange={setPrice}
          />
        </RangeRow>

        {/* Sellable Land Amount */}
        <RangeRow
          label="Sellable Land Amount"
          value={`${sellable[0]} Katha - ${sellable[1]} Katha`}
        >
          <DoubleSlider
            min={0}
            max={100}
            step={1}
            value={sellable}
            onChange={setSellable}
          />
        </RangeRow>

        {/* Plot Size */}
        <RangeRow
          label="Plot Size"
          value={`${plot[0]} Katha - ${plot[1]} Katha`}
        >
          <DoubleSlider
            min={0}
            max={100}
            step={1}
            value={plot}
            onChange={setPlot}
          />
        </RangeRow>

        {/* Distance From Road */}
        <RangeRow label="Distance From Road" value={`${road[0]}m-${road[1]}m`}>
          <DoubleSlider
            min={0}
            max={2000}
            step={10}
            value={road}
            onChange={setRoad}
          />
        </RangeRow>

        {/* Dropdowns (your style) */}
        <div className="space-y-4">
          <HookFormSingleSelect<FiltersForm>
            name="division"
            control={control}
            label="Division"
            placeholder="Select your division"
            options={DIVISION_OPTIONS}
            onChange={() => {
              setValue("district", null);
              setValue("upazila", null);
              setValue("pouroshovaOrUnion", "");
              setValue("wardNo", "");
            }}
          />
          <HookFormSingleSelect<FiltersForm>
            name="district"
            control={control}
            label="District"
            placeholder="Select your district"
            options={districtOptions}
            disabled={!division}
            onChange={() => {
              setValue("upazila", null);
              setValue("pouroshovaOrUnion", "");
              setValue("wardNo", "");
            }}
          />
          <HookFormSingleSelect<FiltersForm>
            name="upazila"
            control={control}
            label="Upazila"
            placeholder="Select your upazilla"
            options={upazilaOptions}
            disabled={!district}
            onChange={() => {
              setValue("pouroshovaOrUnion", "");
              setValue("wardNo", "");
            }}
          />
          <HookFormTextInput<FiltersForm>
            name="pouroshovaOrUnion"
            control={control}
            label="Pouroshova/City Corp/Union"
            placeholder="Enter Pouroshova/City Corp/Union"
            inputClassName="h-12 px-4"
          />
          <HookFormTextInput<FiltersForm>
            name="wardNo"
            control={control}
            label="Ward No"
            placeholder="Enter Ward No"
            inputClassName="h-12 px-4"
          />

          {/* Optional: manual min/max fields if you want */}
          <div className="grid grid-cols-2 gap-4">
            <HookFormTextInput<FiltersForm>
              name="minPrice"
              control={control}
              label="Min Price"
              inputClassName="h-12 px-4"
            />
            <HookFormTextInput<FiltersForm>
              name="maxPrice"
              control={control}
              label="Max Price"
              inputClassName="h-12 px-4"
            />
          </div>
        </div>

        <Button className="w-full h-12 rounded-xl" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}

function RangeRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-extrabold text-black">{label}</p>
        <p className="text-sm font-extrabold text-primary">{value}</p>
      </div>
      <div className="mt-3">{children}</div>
      <div className="mt-2 flex justify-between text-xs text-black/40">
        <span>Min</span>
        <span>Max</span>
      </div>
    </div>
  );
}

/**
 * Simple double slider (two input range stacked)
 * Visual matches SS enough without any lib.
 */
function DoubleSlider({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const [a, b] = value;

  const setA = (next: number) => {
    const clamped = Math.min(next, b - step);
    onChange([Math.max(min, clamped), b]);
  };

  const setB = (next: number) => {
    const clamped = Math.max(next, a + step);
    onChange([a, Math.min(max, clamped)]);
  };

  return (
    <div className="relative h-6">
      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-black/10" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
        style={{
          left: `${((a - min) / (max - min)) * 100}%`,
          width: `${((b - a) / (max - min)) * 100}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
        className="absolute inset-0 w-full appearance-none bg-transparent"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
        className="absolute inset-0 w-full appearance-none bg-transparent"
      />
    </div>
  );
}

// SS uses lakh/crore style; we show like 50,00,000
function toBDT(lakh: number) {
  return (lakh * 100000).toLocaleString("en-IN");
}
