"use client";

import { useStore } from "@/store/store";
import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
  const setFilterModal = useStore((state) => state.setFilterSheetOpen);

  return (
    <div
      className={
        "border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      }
      onClick={setFilterModal}
    >
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"text-sm font-semibold px-6"}>
          <p>AnyWhere</p>
        </div>
        <div
          className={
            "hidden text-sm sm:block font-semibold px-6 border-x-[1px] flex-1 text-center"
          }
        >
          <p>Any-week</p>
        </div>
        <div
          className={
            "text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3"
          }
        >
          <div className={"hidden sm:block"}>
            <p>Add Guests</p>
          </div>
          <div className={"p-2 bg-rose-500 rounded-full text-white"}>
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
