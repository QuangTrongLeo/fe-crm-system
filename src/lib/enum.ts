export const CustomerStatus = {
  LEAD: "LEAD",
  POTENTIAL: "POTENTIAL",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type CustomerStatus =
  (typeof CustomerStatus)[keyof typeof CustomerStatus];
