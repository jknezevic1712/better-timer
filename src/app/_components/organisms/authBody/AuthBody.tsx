// types
import type { Dispatch } from "react";
import type { AuthDispatchAction } from "@/app/(routes)/auth/page";
// components
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

type AuthBodyProps = {
  authState: { isSignUpForm: boolean; email: string; password: string };
  dispatch: Dispatch<AuthDispatchAction>;
  handleSubmit: () => void;
};
export default function AuthBody(props: AuthBodyProps) {
  const { authState, dispatch, handleSubmit } = props;

  return (
    <div className="shadow-2 border-round w-full bg-zinc-200 p-4 lg:w-6">
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
  );
}
