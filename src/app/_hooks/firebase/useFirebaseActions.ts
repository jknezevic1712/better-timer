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
import type { TrackerFromDB, TrackerToSend } from "@/app/_types/tracker";
import type { Unsubscribe } from "firebase/firestore";
// custom hooks
import useToast from "@/app/_hooks/toast/useToast";
import useStore from "@/app/_store/store";
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
  const trackers = useStore((state) => state.trackers);
  const setTrackers = useStore((state) => state.setTrackers);
  const unsubscribeFetchTrackers: MutableRefObject<Unsubscribe | undefined> =
    useRef();

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

  const addNewTracker = async (description: string) => {
    try {
      if (currentUser) {
        const todaysDate = Date.now().toString();

        const trackerData: TrackerToSend = {
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
  };

  const stopAllTrackers = async () => {
    try {
      if (currentUser) {
        const batch = writeBatch(db);
        const activeTrackers = filterTrackers(trackers, "active");

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
  };

  const fetchTrackers = (): void | Unsubscribe => {
    try {
      if (currentUser) {
        const q = query(collection(db, `users/${currentUser.uid}/trackers`));
        unsubscribeFetchTrackers.current = onSnapshot(q, (querySnapshot) => {
          const data: Record<string, TrackerToSend> = {};

          querySnapshot.forEach((doc) => {
            data[doc.id] = doc.data() as TrackerToSend;
          });

          const structuredData: TrackerFromDB[] = Object.entries(data).map(
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

          return;
        });
      }

      return;
    } catch (e) {
      toast(`Error fetching trackers from DB, reason: ${e}`, "error");
    }
  };

  const startTracker = (id: string) => {
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
  };

  const pauseTracker = (id: string) => {
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
  };

  const stopTracker = (id: string) => {
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
  };

  const editTracker = (
    id: string,
    data: Pick<TrackerFromDB, "description" | "startTime" | "endTime">,
  ) => {
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
  };

  const deleteTracker = async (id: string) => {
    try {
      if (currentUser) {
        await deleteDoc(doc(db, `users/${currentUser.uid}/trackers`, id));
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error stopping the tracker, reason: ${e}`, "error");
    }
  };

  const updateTrackerTime = (id: string, endTime: string) => {
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
  };

  return {
    addUserToDB,
    addNewTracker,
    stopAllTrackers,
    fetchTrackers,
    unsubscribeFetchTrackers,
    startTracker,
    pauseTracker,
    stopTracker,
    editTracker,
    deleteTracker,
    updateTrackerTime,
  };
}
