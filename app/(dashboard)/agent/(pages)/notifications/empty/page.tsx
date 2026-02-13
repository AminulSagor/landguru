"use client";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function NotificationsEmptyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* back + title like screenshot */}
      <div className="mb-6 flex items-center justify-center relative">
        <button className="absolute left-0 text-sm font-semibold text-gray/60 hover:text-gray">
          <Link href={'/agent/notifications'}>← Back</Link>
        </button>

        <h2 className="text-xl font-extrabold">Notifications</h2>
      </div>

      <Card className="rounded-2xl py-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <MailCheck size={34} className="text-primary" />
          </div>

          <h3 className="mt-6 text-2xl font-extrabold">You’re all caught up</h3>

          <p className="mt-3 text-sm leading-6 text-gray/60">
            Check back later for updates on appointments, new listings, and open
            houses.
          </p>

          <Button className="mt-8 px-10">Explore New Listings</Button>
        </div>
      </Card>
    </div>
  );
}
