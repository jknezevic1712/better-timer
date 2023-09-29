// types
import type { AuthDispatchAction } from "@/app/(routes)/auth/page";
import type { Dispatch } from "react";
// components
import AuthBody from "@/app/_components/organisms/authBody/AuthBody";
import AuthFooter from "@/app/_components/organisms/authFooter/AuthFooter";

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
    <div className="flex w-full max-w-lg justify-center lg:max-w-3xl">
      <div className="align-items-center justify-content-center flex w-full flex-col gap-4">
        <AuthBody
          authState={authState}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
        />

        <AuthFooter authState={authState} dispatch={dispatch} />
      </div>
    </div>
  );
}
