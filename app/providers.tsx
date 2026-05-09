"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import FCMRegister from "@/components/notifications/fcm-register";
import NotificationPopup from "@/components/notifications/notification-popup";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FCMRegister />
      <NotificationPopup />
      {children}
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}