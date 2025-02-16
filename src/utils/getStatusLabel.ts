import { StatusRecord } from "@/config/01.constants";

export const getStatusLabel = (
  value: string | undefined,
): string | undefined => {
  const entry = Object.values(StatusRecord).find(
    (status) => status.value === value,
  );
  return entry?.label;
};
