import { create } from "zustand";
import { persist } from "zustand/middleware";
// types
import type { User } from "firebase/auth";
import type { TrackerFromDB } from "../_types/tracker";

interface Data {
  user: User | null;
  trackers: TrackerFromDB[];
}

interface Actions {
  setUser: (newUser: User | null) => void;
  setTrackers: (newTrackers: TrackerFromDB[]) => void;
}

export const useStore = create(
  persist<Data & Actions>(
    (set) => ({
      user: null,
      trackers: [],
      setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
      setTrackers: (newTrackers) =>
        set((state) => ({ ...state, trackers: newTrackers })),
    }),
    {
      name: "better-timer-storage",
    },
  ),
);

export default useStore;
