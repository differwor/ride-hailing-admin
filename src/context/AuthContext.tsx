import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import toast from "react-hot-toast";

interface AuthContextType {
  profile: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    AuthService.getProfile().then((res) => {
      setProfile(res.data);
    }).catch(() => {
      toast.error("Failed to fetch user profile");
    });
  }, []);

  return (
    <AuthContext.Provider value={{ profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
