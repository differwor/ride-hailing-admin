"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import toast from "react-hot-toast";

interface AuthContextType {
  profile: User | null;
  isAllowed: (key: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);

  const isAllowed = useCallback(
    (key: string) => (profile?.permissions || []).includes(key) || false,
    [profile],
  );

  useEffect(() => {
    AuthService.getProfile().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        setProfile(res.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ profile, isAllowed }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
