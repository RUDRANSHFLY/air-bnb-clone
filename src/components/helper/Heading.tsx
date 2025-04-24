import React from "react";

interface HeadingProps {
  title: string;
  subTitle: string;
}

const Heading = ({ subTitle, title }: HeadingProps) => {
  return (
    <div className={"flex flex-col gap-2 font-mono"}>
      <h1 className={"text-3xl text-black font-bold"}>{title}</h1>
      <h2 className={"text-md font-semibold italic text-neutral-600"}>
        {subTitle}
      </h2>
    </div>
  );
};

export default Heading;
