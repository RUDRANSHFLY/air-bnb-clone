"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactElement, ReactNode, useCallback } from "react";
import qs from "query-string";

interface CategoryBoxProps {
  name: string;
  desc: string;
  icon: ReactNode;
  selected?: boolean;
}

const CategoryBox = ({
  desc,
  icon: Icon,
  name,
  selected,
}: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleCLick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: name,
    };

    if (params?.get("category") === name) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [name, params, router]);

  return (
    <div
      onClick={handleCLick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition-colors cursor-pointer",
        {
          "border-b-neutral-800": selected,
          "text-neutral-800": selected,
          "text-neutral-500": !selected,
        }
      )}
    >
      {Icon}
      <div className={"font-medium text-sm tracking-wider"}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CategoryBox;
