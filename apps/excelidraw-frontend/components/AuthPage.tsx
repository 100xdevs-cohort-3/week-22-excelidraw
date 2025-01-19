"use client";
import { SigninForm } from "./SigninForm";
import { SignUp } from "./SignupForm";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isSignin ? <SigninForm /> : <SignUp />}
      </div>
    </div>
  );
}
