import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/server/api/firebase/firebase-config";
import useStore from "@/app/_store/store";
import useToast from "@/app/_hooks/toast/Toast";
// types
import type { FirebaseError } from "firebase/app";

export default function useFirebaseAuth() {
  const toast = useToast();
  const router = useRouter();
  const updateUser = useStore((state) => state.updateUser);

  function signUpWithEmailAndPassword(email: string, password: string) {
    console.log("signUpWithEmailAndPassword RENDEEEER!");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateUser(userCredential.user);
        // TODO: Add user with his uid as key and required properties to the firestore (such as empty tasks array)
        toast("successfully signed up!", "success");

        router.push("/trackers");
      })
      .catch((err) => {
        toast(`unsuccessful sign up, reason: ${err.code}`, "error");
      });
  }

  function signInUser(email: string, password: string) {
    console.log("signInUser RENDEEEER!");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateUser(userCredential.user);
        // TODO: Add user with his uid as key and required properties to the firestore (such as empty tasks array)
        toast("successfully signed in!", "success");

        router.push("/trackers");
      })
      .catch((err: FirebaseError) => {
        toast(`unsuccessful sign in, reason: ${err.code}`, "error");
      });
  }

  function signOutUser() {
    console.log("signOutUser RENDEEEER!");

    signOut(auth);
    updateUser(null);
    toast("successfully signed out!", "success");

    router.push("/auth");
  }

  // async function saveNewUserToDB() {
  //   const citiesCol = collection(db, 'cities');
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   return cityList;
  // }

  return {
    signInUser,
    signUpWithEmailAndPassword,
    signOutUser,
  };
}
