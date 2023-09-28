import { auth, db } from "@/server/api/firebase/firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
// types
import type { User } from "firebase/auth";
import useToast from "@/app/_hooks/toast/Toast";

export default function useFirebaseActions() {
  const toast = useToast();
  const currentUser = auth.currentUser;

  async function addUserToDB(userData: User) {
    const newUserData = {
      name: userData.displayName,
      email: userData.email,
      trackers: {
        allala: {},
      },
    };

    try {
      await setDoc(doc(db, "users", userData.uid), newUserData);
      toast("Successfully added a new user to DB!", "success");
    } catch (e) {
      toast(`Error adding user to DB, reason: ${e}`, "error");
    }
  }

  async function addNewTracker() {
    if (currentUser) {
      const trackerData = {
        dateCreated: serverTimestamp(),
        timeLogged: Timestamp.now(),
        description: "",
      };

      try {
        const docRef = await addDoc(
          collection(db, `users/${currentUser.uid}/trackers`),
          trackerData,
        );

        console.log("Document written with ID: ", docRef.id);
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

  return { addUserToDB, addNewTracker };
}
