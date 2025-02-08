import { User } from "@/types/auth";
import { atom } from "recoil";

export type AuthState = {
  user: User;
  token: string;
};

export const userState = atom<AuthState | null>({
  key: "userState",
  default: null, // Initially no user is logged in
});
