"use client";

import React from "react";

import { featuredProperties } from "@/app/(user)/dashboard/dummy-data/property";
import PropertyTabs from "@/app/(user)/dashboard/(pages)/properties/_components/property-tabs-header";
import PropertyFilters from "@/app/(user)/dashboard/(pages)/properties/_components/property-filters-sidebar";
import PropertyGrid from "@/app/(user)/dashboard/(pages)/properties/_components/property-grid";

type TabKey = "for-sale" | "wanted" | "my-posts";

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("for-sale");

  return (
    <div className="w-full py-24">
      <PropertyTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="pb-10 pt-6">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* LEFT */}
          <div className="col-span-12 md:col-span-4">
            <PropertyFilters />
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-8">
            <PropertyGrid items={featuredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}
