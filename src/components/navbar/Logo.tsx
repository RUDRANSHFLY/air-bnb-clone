import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className={"relative w-28 h-10"}>
      <Image
        className={"hidden md:block cursor-pointer absolute"}
        fill
        priority
        src={"/images/logo.png"}
        alt={"air-BnB logo"}
      />
    </div>
  );
};

export default Logo;
