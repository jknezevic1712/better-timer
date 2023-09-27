import { create } from "zustand";
import { persist } from "zustand/middleware";
// types
import type { User } from "firebase/auth";

interface Data {
  user: User | null;
}

interface Actions {
  updateUser: (newUser: User | null) => void;
}

export const useStore = create(
  persist<Data & Actions>(
    (set) => ({
      user: null,
      updateUser: (newUser) => set((state) => ({ ...state, user: newUser })),
    }),
    {
      name: "better-timer-storage",
    },
  ),
);

export default useStore;
