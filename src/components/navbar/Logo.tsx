"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <div className={"relative w-28 h-10"}>
      <Image
        onClick={() => router.push("/")}
        className={"hidden md:block cursor-pointer absolute"}
        fill
        priority
        src={"/images/logo.png"}
        alt={"air-BnB logo"}
        sizes={"w-[100vw] h-[100vh]"}
      />
    </div>
  );
};

export default Logo;
