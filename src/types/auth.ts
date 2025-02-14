export type Role = "ADMIN" | "OPERATOR";

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  permissions: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}
