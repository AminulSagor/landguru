"use client";

import React from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";

export default function SubmitForReviewCard({
  setReview,
}: {
  setReview: (v: boolean) => void;
}) {
  return (
    <Card className="rounded-2xl p-5">
      <p className="text-[11px] font-semibold text-gray/40 text-center">
        If task is completed, submit it for review.
      </p>

      <Button className="w-full mt-3" onClick={() => setReview(true)}>
        Submit for Review
      </Button>
    </Card>
  );
}
