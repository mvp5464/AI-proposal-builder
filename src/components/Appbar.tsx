"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Appbar = () => {
  const session = useSession();

  return (
    <>
      <nav className="fixed z-50 top-0 px-4 w-full h-16 border-b shadow-sm bg-background/80 backdrop-blur-md flex items-center gap-2 ">
        {session.status === "authenticated" && (
          <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
            <div className="flex flex-wrap gap-2">
              <Avatar>
                <AvatarImage src={session.data?.user?.image!} />
                <AvatarFallback>
                  {session.data?.user?.name?.split("")[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className=" ml-2 font-medium dark:text-white">
                  <div>{session.data?.user?.name?.split(" ")[0]}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {session.data?.user?.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 font-bold text-white rounded-xl ml-4 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16 w-full" />
    </>
  );
};
