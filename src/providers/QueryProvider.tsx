"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data stays fresh for 5 minutes — no refetch if revisiting the same filter
            staleTime: 5 * 60 * 1000,
            // Keep unused cache for 10 minutes before garbage collection
            gcTime: 10 * 60 * 1000,
            // Landing page: no need to refetch on window focus
            refetchOnWindowFocus: false,
            // Don't retry on error for a snappier UX
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
