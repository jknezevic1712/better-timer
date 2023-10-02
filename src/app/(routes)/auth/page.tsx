"use client";

import useFirebaseAuth from "@/app/_hooks/firebase/useFirebaseAuth";
import { useForm, type SubmitHandler } from "react-hook-form";
// components
import AuthTemplate from "@/app/_components/templates/authTemplate/AuthTemplate";
import { useState } from "react";

export type AuthForm = {
  email: string;
  password: string;
  isSignUpForm: boolean;
};
export default function Auth() {
  const { signUpWithEmailAndPassword, signInUser } = useFirebaseAuth();
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    const email = data.email.trim();
    const password = data.password.trim();

    if (email.length > 1 && password.length > 1) {
      if (isSignUpForm) {
        return signUpWithEmailAndPassword(email, password);
      }

      return signInUser(email, password);
    }
  };

  return (
    <AuthTemplate
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      isSignUpForm={isSignUpForm}
      setIsSignUpForm={setIsSignUpForm}
    />
  );
}
