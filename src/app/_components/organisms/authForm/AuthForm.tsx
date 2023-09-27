"use client";

import { useReducer } from "react";
import useFirebaseAuth from "@/app/_hooks/firebase/auth";
// components
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

type Action =
  | { type: "CHANGE_EMAIL" | "CHANGE_PASSWORD"; payload: string }
  | { type: "SWITCH_AUTH_FORM"; payload: null }
  | { type: "AUTHENTICATE"; payload: null };

const initialState = {
  isSignUpForm: false,
  email: "",
  password: "",
};
type InitialState = typeof initialState;

function authReducer(state: InitialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_EMAIL":
      return { ...state, email: payload };
    case "CHANGE_PASSWORD":
      return { ...state, password: payload };
    case "SWITCH_AUTH_FORM":
      return { ...initialState, isSignUpForm: !state.isSignUpForm };
    case "AUTHENTICATE":
      return { ...initialState };
    default:
      return state;
  }
}

export default function AuthForm() {
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
    <div className="flex w-full max-w-3xl justify-center">
      <div className="align-items-center justify-content-center flex w-full flex-col gap-4">
        <div className="surface-card shadow-2 border-round w-full p-4 lg:w-6">
          <div className="mb-5 text-center">
            <h1 className="text-900 mb-3 text-3xl font-medium">
              {authState.isSignUpForm ? "Register" : "Login"}
            </h1>
          </div>

          <div>
            <InputText
              id="email"
              type="email"
              placeholder="Email"
              className="mb-3 w-full"
              value={authState.email}
              onChange={(e) =>
                dispatch({ type: "CHANGE_EMAIL", payload: e.target.value })
              }
            />

            <InputText
              id="password"
              type="password"
              placeholder="Password"
              className="mb-3 w-full"
              value={authState.password}
              onChange={(e) =>
                dispatch({ type: "CHANGE_PASSWORD", payload: e.target.value })
              }
            />

            <Button
              label={authState.isSignUpForm ? "Register" : "Login"}
              className="w-full"
              onClick={() => handleSubmit()}
            />
          </div>
        </div>

        <div className="surface-card shadow-2 border-round flex w-full items-center justify-center gap-6 lg:w-6">
          <div className="relative h-full w-1/4">
            <span className="pi pi-user-plus absolute bottom-0 right-0 text-6xl"></span>
          </div>
          <div className="flex w-3/4 flex-col items-start justify-center p-2">
            <span className="text-600 line-height-3 font-medium">
              {authState.isSignUpForm
                ? "Already have an account?"
                : "Need an account?"}
            </span>
            <button
              className="font-medium text-amber-500 underline"
              onClick={() =>
                dispatch({
                  type: "SWITCH_AUTH_FORM",
                  payload: null,
                })
              }
            >
              {authState.isSignUpForm ? "Login here" : "Register here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
