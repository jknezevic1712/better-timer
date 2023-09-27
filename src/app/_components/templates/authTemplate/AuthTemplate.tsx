// components
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// types
import type { AuthDispatchAction } from "@/app/(routes)/auth/page";
import type { Dispatch } from "react";

type AuthTemplateProps = {
  authState: {
    isSignUpForm: boolean;
    email: string;
    password: string;
  };
  dispatch: Dispatch<AuthDispatchAction>;
  handleSubmit: () => void;
};
export default function AuthTemplate(props: AuthTemplateProps) {
  const { authState, dispatch, handleSubmit } = props;

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
              className="font-medium text-primary underline"
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
