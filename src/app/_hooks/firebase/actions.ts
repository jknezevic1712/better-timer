import { auth, db } from "@/server/api/firebase/firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
// types
import type { User } from "firebase/auth";
import type { TrackerFromDB, TrackerToSend } from "@/app/_types/tracker";
// custom hooks
import useToast from "@/app/_hooks/toast/Toast";
import useStore from "@/app/_store/store";
// utils
import { formatDateToTimestamp } from "@/app/_utils/utils";

export default function useFirebaseActions() {
  const toast = useToast();
  const currentUser = auth.currentUser;
  const storeTrackers = useStore((state) => state.trackers);
  const setTrackers = useStore((state) => state.setTrackers);
  let unsubscribeFetchTrackers: undefined | Unsubscribe;

  async function addUserToDB(userData: User) {
    const newUserData = {
      name: userData.displayName,
      email: userData.email,
    };

    try {
      await setDoc(doc(db, "users", userData.uid), newUserData);
    } catch (e) {
      toast(`Error adding user to DB, reason: ${e}`, "error");
    }
  }

  async function addNewTracker(description: string) {
    try {
      if (currentUser) {
        const trackerData: TrackerToSend = {
          dateCreated: Date.now().toString(),
          description: description,
          startTime: Date.now().toString(),
          endTime: Date.now().toString(),
          stopped: true,
        };
        await addDoc(
          collection(db, `users/${currentUser.uid}/trackers`),
          trackerData,
        );

        toast("Successfully added a new tracker to DB!", "success");
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error adding a new tracker to DB, reason: ${e}`, "error");
    }
  }

  async function fetchTrackers(): Promise<void | Unsubscribe> {
    try {
      if (currentUser) {
        const q = query(collection(db, `users/${currentUser.uid}/trackers`));
        unsubscribeFetchTrackers = onSnapshot(q, (querySnapshot) => {
          const data: Record<string, TrackerToSend> = {};

          querySnapshot.forEach((doc) => {
            data[doc.id] = doc.data() as TrackerToSend;
          });

          const structuredData: TrackerFromDB[] = Object.entries(data).map(
            (res) => ({
              id: res[0],
              dateCreated: +res[1].dateCreated,
              description: res[1].description,
              startTime: res[1].startTime,
              endTime: res[1].endTime,
              loggedTime: formatDateToTimestamp(
                +res[1].endTime - +res[1].startTime,
              ),
              stopped: res[1].stopped,
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
  }

  async function startTracker(id: string) {
    try {
      if (currentUser) {
        const hasAnyTrackerRunning = storeTrackers.find(
          (val) => val.stopped === false,
        );

        if (!hasAnyTrackerRunning) {
          const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
          setDoc(trackerRef, { stopped: false }, { merge: true });

          return;
        }

        toast(
          `Error starting a tricker, reason: there is another tracker already running!`,
          "error",
        );
        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error starting the tracker, reason: ${e}`, "error");
    }
  }

  async function pauseTracker(id: string) {
    try {
      if (currentUser) {
        const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
        setDoc(trackerRef, { stopped: true }, { merge: true });

        return;
      }

      throw "current user doesn't exist!";
    } catch (e) {
      toast(`Error pausing the tracker, reason: ${e}`, "error");
    }
  }

  async function stopTracker(id: string) {
    try {
      if (currentUser) {
        const trackerRef = doc(db, `users/${currentUser.uid}/trackers`, id);
        setDoc(trackerRef, { stopped: true }, { merge: true });

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
    fetchTrackers,
    unsubscribeFetchTrackers,
    startTracker,
    pauseTracker,
    stopTracker,
  };
}
