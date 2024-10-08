"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";

import Postpage from "./postpage";
import JobPostSkeleton from "./PostPageSkeleton";

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div>
        <JobPostSkeleton />
      </div>
    );

  return session ? (
    <div className="">
      <Postpage />
    </div>
  ) : (
    <div className="w-full top-1/2 fixed left-[20%] text-6xl justify-center align-middle items-center gap-2">
      You have to{" "}
      <button
        onClick={() => signIn()}
        className="bg-black px-3 py-1 text-white rounded-md p-2"
      >
        Sign In
      </button>{" "}
      to see this page
    </div>
  );
};

export default Page;
