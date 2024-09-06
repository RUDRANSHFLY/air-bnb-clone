"use client";

import useCountries from "@/actions/getCountires";
import { useStore } from "@/store/store";
import { differenceInDays } from "date-fns";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const SearchBox = () => {
  const setFilterModal = useStore((state) => state.setFilterSheetOpen);
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.Label;
    }

    return "AnyWhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className={
        "border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      }
      onClick={setFilterModal}
    >
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"text-sm font-semibold px-6"}>
          <p>{locationLabel}</p>
        </div>
        <div
          className={
            "hidden text-sm sm:block font-semibold px-6 border-x-[1px] flex-1 text-center"
          }
        >
          <p>{durationLabel}</p>
        </div>
        <div
          className={
            "text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3"
          }
        >
          <div className={"hidden sm:block"}>
            <p>{guestLabel}</p>
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
