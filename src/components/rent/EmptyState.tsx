"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  showReset,
  subtitle = "Try Changing or removing some of u r filters",
  title = "No exact Matches",
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div
      className={
        "h-[60vh] w-[60vw] flex flex-col gap-2 justify-center items-center mx-auto"
      }
    >
      <div className={"flex flex-col gap-2 justify-center items-center"}>
        <h1 className={"font-extrabold text-base sm:text-2xl text-center"}>
          {title}
        </h1>
        <h2 className={"text-sm text-center sm:text-base"}>{subtitle}</h2>
      </div>
      {showReset && (
        <div className={"mt-5"}>
          <Button
            className={"border-2 border-black"}
            variant={"secondary"}
            onClick={() => router.push("/")}
          >
            Remove All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
