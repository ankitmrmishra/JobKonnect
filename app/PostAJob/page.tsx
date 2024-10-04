"use client";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

import Postpage from "./postpage";

const Page = () => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Is Loading </div>;

  return isAuthenticated ? (
    <div className="">
      <Postpage />{" "}
    </div>
  ) : (
    <div className="w-full top-1/2 fixed left-[20%] text-6xl justify-center align-middle items-center gap-2">
      You have to{" "}
      <LoginLink className="bg-black px-3 py-1 text-white rounded-md p-2 ">
        Sign In
      </LoginLink>{" "}
      to see this page
    </div>
  );
};

export default Page;
