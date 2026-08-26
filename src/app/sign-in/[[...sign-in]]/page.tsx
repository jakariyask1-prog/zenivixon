import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
      <SignIn />
    </div>
  );
}
