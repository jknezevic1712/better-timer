import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { signOut } from "@/server/api/firebase/firebase-auth";
import { auth } from "@/server/api/firebase/firebase-config";

export default function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const { currentUser } = auth;

  function signUpWithEmailAndPassword(email: string, password: string) {
    console.log("signUpWithEmailAndPassword RENDEEEER!");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sign Up successful! ", userCredential.user);
        setUser(userCredential.user);
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
        setUser(userCredential.user);
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
    signOut();
  }

  return { currentUser, signInUser, signUpWithEmailAndPassword, signOutUser };
}
