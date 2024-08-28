"use client";
import { useStore } from "@/store/store";
import React, { useMemo, useState } from "react";

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
import Counter from "../steps/Counter";
import ImageUpload from "../steps/ImageUpload";
import Modal from "../modals/Modal";

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
  const setRentSheetOpen = useStore((state) => state.setRentModalSheetOpen);

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
  const selectedGuestCount = watch("guestCount", []);
  const roomCount = watch("roomCount", []);
  const bathroomCount = watch("bathroomCount", []);
  const selectedImageSrc = watch("imageSrc", []);

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

  const actionLabel = useMemo(() => {
    if (step === RENTSTEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === RENTSTEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle>Which of these best describes your place ?</CardTitle>
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
                onClick={(category) => setCustomValue("category", category)}
              />
            </div>
          ))}
        </CardContent>
      </CardContent>
    </Card>
  );

  if (step === RENTSTEPS.LOCATION) {
    bodyContent = (
      <Card>
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
      </Card>
    );
  }

  if (step === RENTSTEPS.INFO) {
    bodyContent = (
      <Card>
        <CardHeader>
          <CardTitle>Share some basic about your place</CardTitle>
          <CardDescription>What ammenties do u have ?</CardDescription>
        </CardHeader>
        <CardContent>
          <Counter
            title={"Guests"}
            subtitle={"How many guests do u allow ?"}
            value={selectedGuestCount}
            onChange={(guest) => {
              setCustomValue("guestCount", guest);
            }}
          />
          <hr />
        </CardContent>
        <CardContent>
          <Counter
            title={"Rooms"}
            subtitle={"How many rooms do u have ?"}
            value={roomCount}
            onChange={(room) => {
              setCustomValue("roomCount", room);
            }}
          />
        </CardContent>
        <CardContent>
          <Counter
            title={"Bathrooms"}
            subtitle={"How many bathrooms do u have ?"}
            value={bathroomCount}
            onChange={(bathroom) => {
              setCustomValue("bathroomCount", bathroom);
            }}
          />
        </CardContent>
      </Card>
    );
  }

  if (step === RENTSTEPS.IMAGES) {
    bodyContent = (
      <Card>
        <CardHeader>
          <CardTitle>Add a Photho of your place</CardTitle>
          <CardDescription>
            Show guests what your place look like!
          </CardDescription>
        </CardHeader>
        <CardContent className={"!importantz-50"}>
          <ImageUpload
            onChange={(image) => {
              setCustomValue("imageSrc", image);
            }}
            value={selectedImageSrc}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Modal
        title={"Air-BnB u r Home  "}
        body={bodyContent}
        isOpen={isRentSheetOpen}
        onCLose={setRentSheetOpen}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === RENTSTEPS.CATEGORY ? undefined : onBack}
      />
    </div>

    // <div>
    //   <Sheet open={isRentSheetOpen}>
    //     <SheetContent
    //       side={"top"}
    //       className={"w-fit h-fit mx-auto top-5 bg-neutral-200"}
    //     >
    //       <SheetHeader>
    //         <SheetTitle>Air-BnB u r Home</SheetTitle>
    //         <SheetDescription>upload u r home on rent</SheetDescription>
    //       </SheetHeader>
    //       <Card className={"mt-5"}>
    //         {step === RENTSTEPS.CATEGORY && (
    //           <>
    //             <CardHeader>
    //               <CardTitle>
    //                 Which of these best describes your place ?
    //               </CardTitle>
    //               <CardDescription>Pick a Category</CardDescription>
    //             </CardHeader>
    //             <CardContent
    //               className={
    //                 "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-h-[50vh] overflow-y-scroll gap-4 scrollbar-hide"
    //               }
    //             >
    //               {categories.map((category) => (
    //                 <div className={"col-span-1"} key={category.label}>
    //                   <CategoryInput
    //                     icon={category.icon}
    //                     categoryName={category.label}
    //                     categorySelected={selectedCategory === category.label}
    //                     onClick={(category) =>
    //                       setCustomValue("category", category)
    //                     }
    //                   />
    //                 </div>
    //               ))}
    //             </CardContent>
    //           </>
    //         )}
    //         {step === RENTSTEPS.LOCATION && (
    //           <>
    //             <CardHeader>
    //               <CardTitle>Where is your place Located ?</CardTitle>
    //               <CardDescription>Help guests find you!</CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //               <CountryInput
    //                 currentCountry={selectedCountry}
    //                 onCountrySelect={(country) => {
    //                   setCustomValue("location", country);
    //                 }}
    //               />
    //             </CardContent>
    //             <CardContent>
    //               <Map
    //                 center={selectedCountry?.lating}
    //                 countryName={selectedCountry?.Label}
    //               />
    //             </CardContent>
    //           </>
    //         )}
    //         {step === RENTSTEPS.INFO && (
    //           <div className={"flex flex-col gap-8"}>
    //             <CardHeader>
    //               <CardTitle>Share some basic about your place</CardTitle>
    //               <CardDescription>What ammenties do u have ?</CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //               <Counter
    //                 title={"Guests"}
    //                 subtitle={"How many guests do u allow ?"}
    //                 value={selectedGuestCount}
    //                 onChange={(guest) => {
    //                   setCustomValue("guestCount", guest);
    //                 }}
    //               />
    //               <hr />
    //             </CardContent>
    //             <CardContent>
    //               <Counter
    //                 title={"Rooms"}
    //                 subtitle={"How many rooms do u have ?"}
    //                 value={roomCount}
    //                 onChange={(room) => {
    //                   setCustomValue("roomCount", room);
    //                 }}
    //               />
    //             </CardContent>
    //             <CardContent>
    //               <Counter
    //                 title={"Bathrooms"}
    //                 subtitle={"How many bathrooms do u have ?"}
    //                 value={bathroomCount}
    //                 onChange={(bathroom) => {
    //                   setCustomValue("bathroomCount", bathroom);
    //                 }}
    //               />
    //             </CardContent>
    //           </div>
    //         )}
    //         {step === RENTSTEPS.IMAGES && (
    //           <div>
    //             <CardHeader>
    //               <CardTitle>Add a Photho of your place</CardTitle>
    //               <CardDescription>
    //                 Show guests what your place look like!
    //               </CardDescription>
    //             </CardHeader>
    //             <CardContent className={"!importantz-50"}>
    //               <ImageUpload
    //                 onChange={(image) => {
    //                   setCustomValue("imageSrc", image);
    //                 }}
    //                 value={selectedImageSrc}
    //               />
    //             </CardContent>
    //           </div>
    //         )}

    //         <CardContent className={"flex justify-center"}>
    //           {step === RENTSTEPS.CATEGORY ? (
    //             <Button
    //               onClick={onNext}
    //               className={"w-52 bg-red-600 hover:bg-red-700"}
    //             >
    //               Next
    //             </Button>
    //           ) : (
    //             <div className={"flex justify-center gap-5"}>
    //               <Button
    //                 onClick={onBack}
    //                 className={"w-52 border-black"}
    //                 variant={"outline"}
    //               >
    //                 Back
    //               </Button>
    //               <Button
    //                 onClick={onNext}
    //                 className={"w-52 bg-red-600 hover:bg-red-700"}
    //                 variant={"default"}
    //               >
    //                 Next
    //               </Button>
    //             </div>
    //           )}
    //         </CardContent>
    //       </Card>
    //     </SheetContent>
    //   </Sheet>
    // </div>
  );
};

export default Rent;
