import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import { MailCheck } from "lucide-react";

export default function NotificationsEmptyState() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl rounded-2xl p-12 text-center ">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
          <MailCheck className="h-10 w-10 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          You’re all caught up
        </h2>

        {/* Subtitle */}
        <p className="text-base text-gray max-w-md mx-auto mb-8">
          Check back later for updates on appointments, new listings, and open
          houses.
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center">
          <Button>Explore New Listings</Button>
        </div>
      </Card>
    </div>
  );
}
