import { Role } from "@/types/auth";

export const users = [
  {
    id: 123463,
    email: "a@m.com",
    name: "Nguyen Bang Qua",
    password: "1234", // In a real app, this would be hashed
    role: "ADMIN" as Role,
  },
  {
    id: 321312,
    email: "d@m.com",
    name: "Tran La Luot",
    password: "1234", // In a real app, this would be hashed
    role: "ADMIN" as Role,
  },
  {
    id: 2,
    email: "o@m.com",
    name: "Truong Anh Ngoc",
    password: "1234",
    role: "OPERATOR" as Role,
  },
];
