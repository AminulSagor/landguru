"use client";

import React, { useState } from "react";
import Card from "@/components/cards/card";
import Button from "@/components/buttons/button";
import agentTaskService from "@/service/agent/agent-task.service";
import toast from "react-hot-toast";
import { formatApiError } from "@/lib/format-api-error";

type Props = {
  assignmentId: string;
  onAccepted?: () => void;
};

export default function AcceptTaskCard({ assignmentId, onAccepted }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await agentTaskService.acceptTask(assignmentId);
      toast.success("Task accepted");
      onAccepted?.();
    } catch (err: any) {
      console.error("Accept task failed", err);
      toast.error(formatApiError(err).message || "Failed to accept task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl p-5">
      <Button className="w-full bg-pumpkin hover:opacity-95" onClick={handleAccept} disabled={loading}>
        {loading ? "Accepting..." : "Accept Task"}
      </Button>

      <p className="mt-3 text-[11px] font-semibold text-gray/40 text-center">
        By accepting, you agree to the{" "}
        <span className="text-primary font-extrabold cursor-pointer hover:opacity-80">terms of service</span>.
      </p>
    </Card>
  );
}
