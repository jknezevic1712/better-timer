// components
import AuthForm from "../_components/organisms/authForm/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-lime-600 sm:text-[5rem]">
          Sign up
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
