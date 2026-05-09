"use client";
import React from "react";
import Button from "@/components/buttons/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ServerErrorProps {
  title?: string;
  message?: string;
  code?: number | string;
  onRetry?: () => void;
}

const ServerError = ({
  title = "Server error",
  message = "Something went wrong while talking to the server. Please try again.",
  code,
  onRetry,
}: ServerErrorProps) => {
  return (
    <div className="rounded-2xl bg-red-50 border border-red-100 p-4 flex items-start gap-4">
      <div className="p-2 rounded-md bg-red-100">
        <AlertTriangle className="text-red-500" size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-extrabold text-gray">{title}</p>
        <p className="mt-1 text-sm text-gray/70">{message}</p>
        {code ? (
          <p className="mt-2 text-xs text-gray-500">
            Error code: <span className="font-mono text-xs text-gray-600">{code}</span>
          </p>
        ) : null}
      </div>
      {onRetry ? (
        <Button onClick={onRetry} variant="primary" size="sm" className="ml-auto">
          <RefreshCcw size={14} />
          Retry
        </Button>
      ) : null}
    </div>
  );
};

export default ServerError;
