import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignIn
        path="/sign-in"
        forceRedirectUrl="/new-user"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
