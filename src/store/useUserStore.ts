import { AuthService } from "@/services/auth.service";
import { User } from "@/types/auth";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  fetchUsers: () => Promise<void>;
  hasPermission: (key: string) => boolean;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  fetchUsers: async () => {
    AuthService.getProfile().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        set({ user: res.data });
      }
    });
  },
  hasPermission: (key: string) =>
    (get().user?.permissions || []).includes(key) || false,
}));

export default useUserStore;
