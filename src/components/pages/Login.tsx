"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../icons/Loader";

export default function Login() {
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  if (status === "loading") {
    return (
      <>
        <Loader info={"Getting Session Info"} />
      </>
    );
  }
  if (status === "authenticated") {
    router.push("/company-info");
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await signIn("google");
            setLoading(false);
          }}
        >
          {loading ? "Loading..." : "Login with Google"}
        </button>
      </div>
    </>
  );
}
