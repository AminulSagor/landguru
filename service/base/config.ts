export const service_URL = process.env.NEXT_PUBLIC_SERVICE_URL || "";

if (!service_URL) {
  if (process.env.NODE_ENV === "development") {
    console.warn("NEXT_PUBLIC_SERVICE_URL is missing");
  }
}
