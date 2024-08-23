"use client";
import { useStore } from "@/store/store";
import React, { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { categories } from "../../../types";
import CategoryInput from "../category/CategoryInput";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import CountryInput from "../inputs/CountryInput";
import dynamic from "next/dynamic";

enum RENTSTEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const Rent = () => {
  const isRentSheetOpen = useStore((state) => state.rentModalSheetOpen);

  const [step, setStep] = useState(RENTSTEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const selectedCategory = watch("category", []);
  const selectedCountry = watch("location", []);

  const Map = useMemo(
    () =>
      dynamic(() => import("../maps/Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCountry]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((state) => state - 1);
  };
  const onNext = () => {
    setStep((state) => state + 1);
  };

  return (
    <Sheet open={isRentSheetOpen}>
      <SheetContent
        side={"top"}
        className={"relative w-fit h-fit mx-auto top-5 bg-neutral-200"}
      >
        <SheetHeader>
          <SheetTitle>Air-BnB u r Home</SheetTitle>
          <SheetDescription>upload u r home on rent</SheetDescription>
        </SheetHeader>
        <Card className={"mt-5"}>
          {step === RENTSTEPS.CATEGORY && (
            <>
              <CardHeader>
                <CardTitle>
                  Which of these best describes your place ?
                </CardTitle>
                <CardDescription>Pick a Category</CardDescription>
              </CardHeader>
              <CardContent
                className={
                  "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-h-[50vh] overflow-y-scroll gap-4 scrollbar-hide"
                }
              >
                {categories.map((category) => (
                  <div className={"col-span-1"} key={category.label}>
                    <CategoryInput
                      icon={category.icon}
                      categoryName={category.label}
                      categorySelected={selectedCategory === category.label}
                      onClick={(category) =>
                        setCustomValue("category", category)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </>
          )}
          {step === RENTSTEPS.LOCATION && (
            <>
              <CardHeader>
                <CardTitle>Where is your place Located ?</CardTitle>
                <CardDescription>Help guests find you!</CardDescription>
              </CardHeader>
              <CardContent>
                <CountryInput
                  currentCountry={selectedCountry}
                  onCountrySelect={(country) => {
                    setCustomValue("location", country);
                  }}
                />
              </CardContent>
              <CardContent>
                <Map
                  center={selectedCountry?.lating}
                  countryName={selectedCountry?.Label}
                />
              </CardContent>
            </>
          )}

          <CardContent className={"flex justify-center"}>
            {step === RENTSTEPS.CATEGORY ? (
              <Button
                onClick={onNext}
                className={"w-52 bg-red-600 hover:bg-red-700"}
              >
                Next
              </Button>
            ) : (
              <div className={"flex justify-center gap-5"}>
                <Button
                  onClick={onBack}
                  className={"w-52 border-black"}
                  variant={"outline"}
                >
                  Back
                </Button>
                <Button
                  onClick={onNext}
                  className={"w-52 bg-red-600 hover:bg-red-700"}
                  variant={"default"}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default Rent;
