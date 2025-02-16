export const API_AUTH_PREFIX = "/auth";
export const API_ADMIN_PREFIX = "/adm";

export const PAGINATION_LIMIT = 5;

export const StatusRecord = {
  COMPLETED: { value: "completed", label: "Complete" },
  CANCELLED: { value: "cancelled", label: "Cancelled" },
  PENDING: { value: "pending", label: "Pending" },
  IN_PROGRESS: { value: "in-progress", label: "In Progress" },
} as const;

export const StatusArray = Object.values(StatusRecord).map((s) => s.value);

export const SW_SERVER_URL =
  process.env.NEXT_PUBLIC_WS_SERVER_URL || "ws://localhost:8080";
export const SW_SERVER_API_URL =
  process.env.NEXT_PUBLIC_WS_SERVER_API_URL || "http://localhost:8080";
