import { AuthService } from "@/services/auth.service";
import { User } from "@/types/auth";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  pers: string[] | []; // can define permission type
  fetchUsers: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  pers: [],
  fetchUsers: async () => {
    AuthService.getProfile().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        set({ user: res.data, pers: res.data?.permissions });
      }
    });
  },
}));

export default useUserStore;
