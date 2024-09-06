"use client";

import { PuffLoader } from "react-spinners";

import React from "react";

const Loading = () => {
  return (
    <div className={"h-[70vh] flex flex-col justify-center items-center"}>
      <PuffLoader size={100} color={"red"} />
    </div>
  );
};

export default Loading;
