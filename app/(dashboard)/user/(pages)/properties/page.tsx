"use client";

import React from "react";

import { featuredProperties } from "@/app/(dashboard)/user/dummy-data/property";

import { propertyRequestsData } from "@/app/(dashboard)/user/dummy-data/property-request";

import { myListingsProperty } from "@/app/(dashboard)/user/dummy-data/my-property-list";
import { demoBuyPosts } from "@/app/(dashboard)/user/dummy-data/buy-post-data";
import { OFFER_POSTS } from "@/app/(dashboard)/user/dummy-data/offer-post-data";
import PropertyTabs from "@/app/(dashboard)/user/(pages)/properties/_components/property-tabs-header";
import PropertyFilters from "@/app/(dashboard)/user/(pages)/properties/_components/property-filters-sidebar";
import PropertyGrid from "@/app/(dashboard)/user/(pages)/properties/_components/property-grid";
import PropertyRequestGrid from "@/app/(dashboard)/user/(pages)/properties/_components/property-request-grid";
import MYPropertyFilters from "@/app/(dashboard)/user/(pages)/properties/_components/my-property-filter-sidebar";
import MyPropertyGrid from "@/app/(dashboard)/user/(pages)/properties/_components/my-property-grid";
import BuyPostDataGrid from "@/app/(dashboard)/user/(pages)/properties/_components/buy-post-grid";
import OfferPostGrid from "@/app/(dashboard)/user/(pages)/properties/_components/offer-post-grid";

type TabKey = "for-sale" | "wanted" | "my-posts";

//my post tab types
export type Category = "Sell Posts" | "Buy Posts" | "Offered Posts";
export type Status = "All Status" | "Pending" | "Quoted" | "Active" | "Draft";

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("for-sale");
  const [category, setCategory] = React.useState<Category>("Sell Posts");
  const [status, setStatus] = React.useState<Status>("All Status");

  return (
    <div className="w-full py-24">
      <PropertyTabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "for-sale" ? (
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
      ) : activeTab === "wanted" ? (
        <div className="pb-10 pt-6">
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* LEFT */}
            <div className="col-span-12 md:col-span-4">
              <PropertyFilters />
            </div>

            {/* RIGHT */}
            <div className="space-y-4 col-span-12 md:col-span-8">
              <PropertyRequestGrid items={propertyRequestsData} />
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-10 pt-6">
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* LEFT */}
            <div className="col-span-12 md:col-span-4">
              <MYPropertyFilters
                status={status}
                category={category}
                setCategory={setCategory}
                setStatus={setStatus}
              />
            </div>

            {/* RIGHT */}
            {category === "Sell Posts" ? (
              <div className="col-span-12 md:col-span-8">
                <MyPropertyGrid items={myListingsProperty} />
              </div>
            ) : category === "Buy Posts" ? (
              <div className="col-span-12 md:col-span-8">
                <BuyPostDataGrid items={demoBuyPosts} />
              </div>
            ) : (
              <div className="col-span-12 md:col-span-8">
                <OfferPostGrid items={OFFER_POSTS} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
