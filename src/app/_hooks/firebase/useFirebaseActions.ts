import { useRef } from "react";
import { db } from "@/server/api/firebase/firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  onSnapshot,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
// types
import type { User } from "firebase/auth";
import type { TrackerForApp, TrackerForDB } from "@/app/_types/tracker";
import type { Unsubscribe } from "firebase/firestore";
// custom hooks
import useToast from "@/app/_hooks/toast/useToast";
import useStore from "@/app/_hooks/store/store";
// helpers
import {
  filterTrackers,
  formatDateToTimestamp,
  getFormattedDate,
} from "@/app/_helpers/helpers";
import type { MutableRefObject } from "react";

export default function useFirebaseActions() {
  const toast = useToast();
  const currentUser = useStore((state) => state.user);
  const storeTrackers = useStore((state) => state.trackers);
  const setTrackers = useStore((state) => state.setTrackers);
  const unsubscribeFromFetchTrackers: MutableRefObject<
    Unsubscribe | undefined
  > = useRef();

  async function addUserToDB(userData: User) {
    const newUserData = {
      name: userData.displayName,
      email: userData.email,
    };

    try {
      await setDoc(doc(db, "users", userData.uid), newUserData);
    } catch (e) {
      toast(`Error adding user, reason: ${e}`, "error");
    }
  }

  async function addNewTracker(description: string) {
    try {
      if (currentUser) {
        const todaysDate = Date.now().toString();

        const trackerData: TrackerForDB = {
          dateCreated: {
            ms: todaysDate,
            formatted: getFormattedDate(+todaysDate),
          },
          description: description,
          startTime: todaysDate,
          endTime: todaysDate,
          running: false,
          active: true,
        };

        await addDoc(
          collection(db, `users/${currentUser.uid}/trackers`),
          trackerData,
        );

        toast("Successfully added a new tracker!", "success");
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error adding a new tracker, reason: ${e}`, "error");
    }
  }

  async function stopAllTrackers() {
    try {
      if (currentUser) {
        const batch = writeBatch(db);
        const activeTrackers = filterTrackers(storeTrackers, "active");

        activeTrackers.forEach((tracker) => {
          const trackerRef = doc(
            db,
            `users/${currentUser.uid}/trackers`,
            tracker.id,
          );
          batch.update(trackerRef, { active: false });
        });

        await batch.commit();

        toast("Successfully stopped all trackers!", "success");
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error stopping all trackers, reason: ${e}`, "error");
    }
  }

  function fetchTrackersSubscription(): void | Unsubscribe {
    try {
      if (currentUser) {
        const q = query(collection(db, `users/${currentUser.uid}/trackers`));
        unsubscribeFromFetchTrackers.current = onSnapshot(
          q,
          (querySnapshot) => {
            const data: Record<string, TrackerForDB> = {};

            querySnapshot.forEach((doc) => {
              data[doc.id] = doc.data() as TrackerForDB;
            });

            const structuredData: TrackerForApp[] = Object.entries(data).map(
              (res) => ({
                id: res[0],
                dateCreated: res[1].dateCreated,
                description: res[1].description,
                startTime: res[1].startTime,
                endTime: res[1].endTime,
                loggedTime: formatDateToTimestamp(
                  +res[1].endTime - +res[1].startTime,
                ),
                running: res[1].running,
                active: res[1].active,
              }),
            );

            setTrackers(structuredData);
          },
        );
      }
    } catch (e) {
      toast(`Error fetching trackers from DB, reason: ${e}`, "error");
    }
  }

  function startTracker(id: string) {
    try {
      if (currentUser) {
        const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
        setDoc(trackerRef, { running: true }, { merge: true });
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error starting the tracker, reason: ${e}`, "error");
    }
  }

  function pauseTracker(id: string) {
    try {
      if (currentUser) {
        const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
        setDoc(trackerRef, { running: false }, { merge: true });
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error pausing the tracker, reason: ${e}`, "error");
    }
  }

  function stopTracker(id: string) {
    try {
      if (currentUser) {
        const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
        setDoc(trackerRef, { running: false, active: false }, { merge: true });

        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error stopping the tracker, reason: ${e}`, "error");
    }
  }

  function editTracker(
    id: string,
    data: Pick<TrackerForApp, "description" | "startTime" | "endTime">,
  ) {
    try {
      if (currentUser) {
        const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
        setDoc(trackerRef, { ...data }, { merge: true });

        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error stopping the tracker, reason: ${e}`, "error");
    }
  }

  async function deleteTracker(id: string) {
    try {
      if (currentUser) {
        await deleteDoc(doc(db, `users/${currentUser.uid}/trackers`, id));
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error stopping the tracker, reason: ${e}`, "error");
    }
  }

  async function syncTrackers() {
    try {
      if (currentUser) {
        const batch = writeBatch(db);

        storeTrackers.forEach((tracker) => {
          const formattedTracker: TrackerForDB = {
            description: tracker.description,
            startTime: tracker.startTime,
            endTime: tracker.endTime,
            dateCreated: tracker.dateCreated,
            active: tracker.active,
            running: tracker.running,
          };

          const trackerRef = doc(
            db,
            `users/${currentUser.uid}/trackers`,
            tracker.id,
          );

          batch.update(trackerRef, { ...formattedTracker });
        });

        await batch.commit();

        toast("Successfully synced trackers!", "success");
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error syncing trackers, reason: ${e}`, "error");
    }
  }

  function updateTrackerTime(id: string, endTime: string) {
    try {
      if (currentUser) {
        const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
        setDoc(trackerRef, { endTime }, { merge: true });

        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error stopping the tracker, reason: ${e}`, "error");
    }
  }

  return {
    addUserToDB,
    addNewTracker,
    stopAllTrackers,
    fetchTrackersSubscription,
    unsubscribeFromFetchTrackers,
    startTracker,
    pauseTracker,
    stopTracker,
    editTracker,
    deleteTracker,
    syncTrackers,
    updateTrackerTime,
  };
}
