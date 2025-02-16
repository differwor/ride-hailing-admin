import { SW_SERVER_URL } from "@/config/01.constants";
import { SocketBody } from "@/types/socket";
import toast from "react-hot-toast";
import { create } from "zustand";

interface WebSocketStore {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  socketData: SocketBody | null;
}

export const useSocketStore = create<WebSocketStore>((set) => ({
  socket: null,
  isConnected: false,
  socketData: null,
  connect: () => {
    const socket = new WebSocket(SW_SERVER_URL);
    socket.onopen = () => {
      socket.send("Hello from Next.js!");
      set({ isConnected: true });
    };
    socket.onerror = () => toast.error("Failed to connect web socket");
    socket.onmessage = (event) => {
      const socketData: SocketBody = JSON.parse(event.data);
      set({ socketData });
    };
    set({ socket });
  },
  disconnect: () => {
    set((state) => {
      state.socket?.close();
      return {};
    });
  },
}));
