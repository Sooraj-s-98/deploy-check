import React from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { cn } from "../lib/utils";

function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 
    shadow-input bg-black bord border-solid border-2 border-slate-800"
    >
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to Image Wordy
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Login to get started
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            className="bg-zinc-800 text-neutral-300"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            className="bg-zinc-800 text-neutral-300"
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 
          to-zinc-900 block bg-zinc-800 w-full text-white 
          rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 
      absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
      />
      <span
        className="group-hover/btn:opacity-100 blur-sm block transition duration-500 
      opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent
       via-indigo-500 to-transparent"
      />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LoginForm;
