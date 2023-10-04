import { create } from "zustand";
import { persist } from "zustand/middleware";
// types
import type { User } from "firebase/auth";
import type { TrackerForApp } from "../_types/tracker";

interface State {
  user: User | null;
  trackers: TrackerForApp[];
}

interface Actions {
  setUser: (newUser: User | null) => void;
  setTrackers: (newTrackers: TrackerForApp[]) => void;
  updateTracker: (trackerID: number, trackerData: TrackerForApp) => void;
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
      updateTracker: (trackerID, trackerData) =>
        set((state) => ({
          ...state,
          trackers: [
            ...state.trackers,
            (state.trackers[trackerID] = trackerData),
          ],
        })),
    }),
    {
      name: "better-timer-storage",
    },
  ),
);

export default useStore;
