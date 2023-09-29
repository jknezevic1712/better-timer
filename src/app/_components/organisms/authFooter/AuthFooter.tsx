// types
import type { AuthDispatchAction } from "@/app/(routes)/auth/page";
import type { Dispatch } from "react";

type AuthFooterProps = {
  authState: { isSignUpForm: boolean; email: string; password: string };
  dispatch: Dispatch<AuthDispatchAction>;
};
export default function AuthFooter(props: AuthFooterProps) {
  const { authState, dispatch } = props;

  return (
    <div className="shadow-2 border-round flex w-full items-center justify-center gap-6 bg-zinc-200 lg:w-6">
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
  );
}
