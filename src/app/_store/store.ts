import { create } from "zustand";
import { persist } from "zustand/middleware";
// types
import type { User } from "firebase/auth";
import type { TrackerFromDB } from "../_types/tracker";

interface State {
  user: User | null;
  trackers: TrackerFromDB[];
}

interface Actions {
  setUser: (newUser: User | null) => void;
  setTrackers: (newTrackers: TrackerFromDB[]) => void;
  resetState: () => void;
}

const initialState: State = {
  user: null,
  trackers: [],
};

export const useStore = create(
  persist<State & Actions>(
    (set) => ({
      ...initialState,
      setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
      setTrackers: (newTrackers) =>
        set((state) => ({ ...state, trackers: newTrackers })),
      resetState: () => set(initialState),
    }),
    {
      name: "better-timer-storage",
    },
  ),
);

export default useStore;
