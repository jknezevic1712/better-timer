import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/server/api/firebase/firebase-config";
// hooks
import useStore from "@/app/_store/store";
import useToast from "@/app/_hooks/toast/Toast";
import useFirebaseActions from "./actions";
// types
import type { FirebaseError } from "firebase/app";

export default function useFirebaseAuth() {
  const toast = useToast();
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const resetState = useStore((state) => state.resetState);
  const { addUserToDB } = useFirebaseActions();

  function signUpWithEmailAndPassword(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        addUserToDB(userCredential.user);
        toast("successfully signed up!", "success");

        router.push("/trackers");
      })
      .catch((err) => {
        toast(`unsuccessful sign up, reason: ${err.code}`, "error");
      });
  }

  function signInUser(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast("successfully signed in!", "success");

        router.push("/trackers");
      })
      .catch((err: FirebaseError) => {
        toast(`unsuccessful sign in, reason: ${err.code}`, "error");
      });
  }

  function signOutUser() {
    signOut(auth);
    setUser(null);
    resetState();
    toast("successfully signed out!", "success");

    router.push("/auth");
  }

  return {
    signInUser,
    signUpWithEmailAndPassword,
    signOutUser,
  };
}
