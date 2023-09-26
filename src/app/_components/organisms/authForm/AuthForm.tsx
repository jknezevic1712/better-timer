"use client";

import { useReducer } from "react";
import useFirebaseAuth from "@/app/_hooks/firebase/auth";

type Action =
  | { type: "CHANGE_EMAIL" | "CHANGE_PASSWORD"; payload: string }
  | { type: "SWITCH_AUTH_FORM"; payload: null }
  | { type: "AUTHENTICATE"; payload: () => void };

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
      payload();
      return { ...initialState };
    default:
      return state;
  }
}

export default function AuthForm() {
  const { currentUser, signUpWithEmailAndPassword, signInUser } =
    useFirebaseAuth();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  function handleSubmit() {
    if (authState.isSignUpForm) {
      return signUpWithEmailAndPassword(authState.email, authState.password);
    }

    return signInUser(authState.email, authState.password);
  }

  console.log("currentUser ", currentUser);

  return (
    <div className="flex items-center justify-center gap-6">
      <input
        className="border"
        type="email"
        name="email"
        value={authState.email}
        onChange={(e) =>
          dispatch({ type: "CHANGE_EMAIL", payload: e.target.value })
        }
      />
      <input
        className="border"
        type="password"
        name="password"
        value={authState.password}
        onChange={(e) =>
          dispatch({ type: "CHANGE_PASSWORD", payload: e.target.value })
        }
      />
      <button
        onClick={() =>
          dispatch({
            type: "AUTHENTICATE",
            payload: handleSubmit,
          })
        }
      >
        {authState.isSignUpForm ? "Sign Up" : "Sign In"}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "SWITCH_AUTH_FORM",
            payload: null,
          })
        }
      >
        Switch To {authState.isSignUpForm ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
}
