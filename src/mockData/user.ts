import { Role } from "@/types/auth";

export const users = [
  {
    id: 1,
    email: 'a@m.com',
    name: 'Admin User',
    password: '1234', // In a real app, this would be hashed
    role: 'ADMIN' as Role
  },
  {
    id: 2,
    email: 'o@m.com',
    name: 'Regular User',
    password: '1234',
    role: 'OPERATOR' as Role
  }
];