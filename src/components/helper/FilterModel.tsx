"use client";

import qs from "query-string";
import { useStore } from "@/store/store";
import React, { useCallback, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountryInput, { CountrySelectValue } from "../inputs/CountryInput";
import { formatISO } from "date-fns";
import Modal from "../modals/Modal";
import Calender from "../inputs/Calender";
import Counter from "../steps/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const FilterModel = () => {
  const getFilterModal = useStore((state) => state.filterSheetOpen);
  const setFilterModal = useStore((state) => state.setFilterSheetOpen);
  const params = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../maps/Map"), {
        ssr: false,
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      bathroomCount,
      roomCount,
      guestCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    setFilterModal();
    router.push(url);
  }, [
    router,
    location,
    step,
    setFilterModal,
    roomCount,
    bathroomCount,
    guestCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondayActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className={"flex flex-col gap-8 px-5"}>
      <div className={"flex flex-col gap-2 font-mono"}>
        <h1 className={"text-3xl text-black font-bold"}>
          Where do u wanna go ?
        </h1>
        <h2 className={"text-md font-semibold italic text-neutral-600"}>
          find the perfect location
        </h2>
      </div>

      <CountryInput
        value={location}
        currentCountry={location}
        onCountrySelect={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.lating} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className={"flex flex-col gap-8 px-5"}>
        <div className={"flex flex-col gap-2 font-mono"}>
          <h1 className={"text-3xl text-black font-bold"}>
            Where do plan to go ?
          </h1>
          <h2 className={"text-md font-semibold italic text-neutral-600"}>
            Make sure everyone is free!
          </h2>
        </div>
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className={"flex flex-col gap-8 px-5"}>
        <div className={"flex flex-col gap-2 font-mono"}>
          <h1 className={"text-3xl text-black font-bold"}>More Information</h1>
          <h2 className={"text-md font-semibold italic text-neutral-600"}>
            find your perfect place
          </h2>
        </div>

        <Counter
          title={"Guests"}
          subtitle={"How many guests are Coming ?"}
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title={"Rooms"}
          subtitle={"How many rooms do u need ?"}
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title={"BathRoom"}
          subtitle={"How many Bathrooms do u need ?"}
          value={guestCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title={"Filter"}
      isOpen={getFilterModal}
      onCLose={setFilterModal}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondayActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default FilterModel;
