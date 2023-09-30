// types
import type { AuthTemplateProps } from "../../templates/authTemplate/AuthTemplate";
// components
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function AuthBody(
  props: Omit<AuthTemplateProps, "setIsSignUpForm">,
) {
  const { register, handleSubmit, errors, isSignUpForm } = props;

  return (
    <div className="shadow-2 border-round w-full bg-zinc-200 p-4 lg:w-6">
      <div className="mb-5 text-center">
        <h1 className="text-900 mb-3 text-3xl font-medium">
          {isSignUpForm ? "Register" : "Login"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <InputText
            id="email"
            type="email"
            className="mb-3 w-full"
            autoComplete="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="p-error">&#42;Please fill out this field.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            className="mb-3 w-full"
            autoComplete={isSignUpForm ? "new-password" : "current-password"}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <small className="p-error">&#42;Please fill out this field.</small>
          )}
        </div>
        <div className="field">
          <Button
            type="submit"
            label={isSignUpForm ? "Register" : "Login"}
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
}
