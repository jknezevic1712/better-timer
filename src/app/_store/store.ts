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
  updateTracker: (trackerArrID: number, trackerData: TrackerForApp) => void;
  updateTrackerTimeByID: (trackerID: string, newTrackerTime: string) => void;
  resetState: () => void;
}

const initialState: State = {
  user: null,
  trackers: [],
};

export const useStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
      setTrackers: (newTrackers) =>
        set((state) => ({ ...state, trackers: newTrackers })),
      updateTracker: (trackerArrID, trackerData) =>
        set((state) => ({
          ...state,
          trackers: [
            ...state.trackers,
            (state.trackers[trackerArrID] = { ...trackerData }),
          ],
        })),
      updateTrackerTimeByID: (trackerID, newTrackerTime) => {
        const storeTrackers = get().trackers;
        const updatedTracker = storeTrackers.find((val, id, trackerArr) => {
          if (val.id === trackerID) {
            return (trackerArr[id] = { ...val, endTime: newTrackerTime });
            // return trackerArr;
          }
        });

        console.log("UPDATED TRACKER ", updatedTracker);
        console.log("NEW TRACKERS ", [...storeTrackers, updatedTracker!][6]);

        return set((state) => ({
          ...state,
          trackers: [...state.trackers, updatedTracker!],
        }));
      },
      resetState: () => set(initialState),
    }),
    {
      name: "better-timer-storage",
    },
  ),
);

export default useStore;
