export const permissions = [
  {
    role: 'ADMIN',
    actions: ['create', 'view', 'update', 'delete'],
  },
  {
    role: 'OPERATOR',
    actions: ['view', 'update:status'],
  },
];