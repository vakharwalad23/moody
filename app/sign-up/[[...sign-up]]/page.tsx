import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignUp path="/sign-up" />
    </div>
  );
}
