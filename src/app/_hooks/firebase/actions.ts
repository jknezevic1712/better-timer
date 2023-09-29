import { auth, db } from "@/server/api/firebase/firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
// types
import type { User } from "firebase/auth";
import useToast from "@/app/_hooks/toast/Toast";
import type { TrackerToSend } from "@/app/_types/tracker";

export default function useFirebaseActions() {
  const toast = useToast();
  const currentUser = auth.currentUser;

  async function addUserToDB(userData: User) {
    const newUserData = {
      name: userData.displayName,
      email: userData.email,
    };

    try {
      await setDoc(doc(db, "users", userData.uid), newUserData);
      toast("Successfully added a new user to DB!", "success");
    } catch (e) {
      toast(`Error adding user to DB, reason: ${e}`, "error");
    }
  }

  async function addNewTracker(description: string) {
    if (currentUser) {
      const trackerData: TrackerToSend = {
        dateCreated: Date.now().toString(),
        description: description,
        startTime: Date.now().toString(),
        endTime: Date.now().toString(),
        stopped: true,
      };

      try {
        await addDoc(
          collection(db, `users/${currentUser.uid}/trackers`),
          trackerData,
        );

        toast("Successfully added a new tracker to DB!", "success");
        return;
      } catch (e) {
        toast(`Error adding a new tracker to DB, reason: ${e}`, "error");
        return;
      }
    }

    toast(
      `Error adding a new tracker to DB, current user doesn't exist!`,
      "error",
    );
    return;
  }

  async function fetchTrackers() {
    if (currentUser) {
      try {
        const trackersRef = collection(db, `users/${currentUser.uid}/trackers`);
        const trackersSnap = await getDocs(trackersRef);
        const data: Record<string, TrackerToSend> = {};

        trackersSnap.forEach((doc) => {
          data[doc.id] = doc.data() as TrackerToSend;
        });

        toast("Successfully fetched trackers from DB!", "success");
        return data;
      } catch (e) {
        toast(`Error fetching trackers from DB, reason: ${e}`, "error");
        return null;
      }
    }
  }

  return { addUserToDB, addNewTracker, fetchTrackers };
}
