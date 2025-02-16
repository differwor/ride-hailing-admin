export const permissions = [
  {
    role: "ADMIN",
    actions: [
      "create",
      "view",
      "update:customer",
      "update:driver",
      "update:pickup",
      "update:destination",
      "update:status",
      "update:review",
      "update:rating",
      "delete",
    ],
  },
  {
    role: "OPERATOR",
    actions: ["view", "update:status"],
  },
];
