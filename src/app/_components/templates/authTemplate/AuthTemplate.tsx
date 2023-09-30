// types
import type { AuthForm } from "@/app/(routes)/auth/page";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";
// components
import AuthBody from "@/app/_components/organisms/authBody/AuthBody";
import AuthFooter from "@/app/_components/organisms/authFooter/AuthFooter";

export type AuthTemplateProps = {
  register: UseFormRegister<AuthForm>;
  handleSubmit: () => any;
  errors: FieldErrors<AuthForm>;
  isSignUpForm: boolean;
  setIsSignUpForm: Dispatch<SetStateAction<boolean>>;
};
export default function AuthTemplate(props: AuthTemplateProps) {
  const { register, handleSubmit, errors, isSignUpForm, setIsSignUpForm } =
    props;

  return (
    <div className="flex w-full max-w-lg justify-center lg:max-w-3xl">
      <div className="align-items-center justify-content-center flex w-full flex-col gap-4">
        <AuthBody
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSignUpForm={isSignUpForm}
        />

        <AuthFooter
          register={register}
          isSignUpForm={isSignUpForm}
          setIsSignUpForm={setIsSignUpForm}
        />
      </div>
    </div>
  );
}
