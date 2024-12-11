import { create } from "zustand";

interface AuthState {
  user: Record<string, any> | null; // Adjust type if the user object has a specific structure
  login: (user: Record<string, any>) => void;
  logout: () => void;
  setUser: (user: Record<string, any>) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user-info") || "null"),
  login: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("user-info");
    set({ user: null });
  },
  setUser: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user)); // Save to localStorage
    set({ user });
  },
}));

export default useAuthStore;
