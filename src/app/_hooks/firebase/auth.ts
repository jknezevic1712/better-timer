import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/server/api/firebase/firebase-config";

export default function useFirebaseAuth() {
  function signUpWithEmailAndPassword(email: string, password: string) {
    console.log("signUpWithEmailAndPassword RENDEEEER!");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sign Up successful! ", userCredential.user);
        // TODO: Add user with his uid as key and required properties to the firestore (such as empty tasks array)
        // TODO: Show toast
      })
      .catch((err) => {
        console.log("Error creating the user ", err);
        // TODO: Show toast
      });
  }

  function signInUser(email: string, password: string) {
    console.log("signInUser RENDEEEER!");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sign Up successful! ", userCredential.user);
        // TODO: Add user with his uid as key and required properties to the firestore (such as empty tasks array)
        // TODO: Show toast
      })
      .catch((err) => {
        console.log("Error creating the user ", err);
        // TODO: Show toast
      });
  }

  function signOutUser() {
    console.log("signOutUser RENDEEEER!");
    signOut(auth);
  }

  // async function saveNewUserToDB() {
  //   const citiesCol = collection(db, 'cities');
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   return cityList;
  // }

  return {
    auth,
    signInUser,
    signUpWithEmailAndPassword,
    signOutUser,
  };
}
