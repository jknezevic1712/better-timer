// types
import type { AuthTemplateProps } from "../../templates/authTemplate/AuthTemplate";

export default function AuthFooter(
  props: Omit<AuthTemplateProps, "handleSubmit" | "errors">,
) {
  const { register, isSignUpForm, setIsSignUpForm } = props;

  return (
    <div className="shadow-2 border-round flex w-full items-center justify-center gap-6 bg-zinc-200 lg:w-6">
      <div className="relative h-full w-1/4">
        <span className="pi pi-user-plus absolute bottom-0 right-0 text-6xl"></span>
      </div>
      <div className="flex w-3/4 flex-col items-start justify-center p-2">
        <span className="text-600 line-height-3 font-medium">
          {isSignUpForm ? "Already have an account?" : "Need an account?"}
        </span>
        <button
          className="font-medium text-primary underline"
          {...register("isSignUpForm")}
          onClick={() => setIsSignUpForm(!isSignUpForm)}
        >
          {isSignUpForm ? "Login here" : "Register here"}
        </button>
      </div>
    </div>
  );
}
