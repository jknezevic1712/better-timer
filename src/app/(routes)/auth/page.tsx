"use client";

import { useReducer } from "react";
import useFirebaseAuth from "@/app/_hooks/firebase/auth";
// components
import AuthTemplate from "@/app/_components/templates/authTemplate/AuthTemplate";

export type AuthDispatchAction =
  | { type: "CHANGE_EMAIL" | "CHANGE_PASSWORD"; payload: string }
  | { type: "SWITCH_AUTH_FORM"; payload: null }
  | { type: "AUTHENTICATE"; payload: null };

const initialState = {
  isSignUpForm: false,
  email: "",
  password: "",
};
type InitialState = typeof initialState;

function authReducer(state: InitialState, action: AuthDispatchAction) {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_EMAIL":
      return { ...state, email: payload };
    case "CHANGE_PASSWORD":
      return { ...state, password: payload };
    case "SWITCH_AUTH_FORM":
      return { ...initialState, isSignUpForm: !state.isSignUpForm };
    case "AUTHENTICATE":
      return { ...initialState, isSignUpForm: state.isSignUpForm };
    default:
      return state;
  }
}

export default function Auth() {
  const { signUpWithEmailAndPassword, signInUser } = useFirebaseAuth();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  function handleSubmit() {
    dispatch({
      type: "AUTHENTICATE",
      payload: null,
    });

    if (authState.isSignUpForm) {
      return signUpWithEmailAndPassword(authState.email, authState.password);
    }

    return signInUser(authState.email, authState.password);
  }

  return (
    <AuthTemplate
      authState={authState}
      dispatch={dispatch}
      handleSubmit={handleSubmit}
    />
  );
}
