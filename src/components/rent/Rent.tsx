"use client";
import "loaders-ui/dist/main/index.min.css";
import { RotatingBars } from "loaders-ui";

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
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { Button } from "../ui/button";
import CountryInput from "../inputs/CountryInput";
import dynamic from "next/dynamic";
import Counter from "../steps/Counter";
import ImageUpload from "../steps/ImageUpload";
import Modal from "../modals/Modal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dollar02Icon } from "hugeicons-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum RENTSTEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const Rent = () => {
  const router = useRouter();
  const isRentSheetOpen = useStore((state) => state.rentModalSheetOpen);
  const setRentSheetOpen = useStore((state) => state.setRentModalSheetOpen);

  const [step, setStep] = useState(RENTSTEPS.CATEGORY);
  const [loading, setLoading] = useState(false);

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
  const title = watch("title", []);
  const description = watch("description", []);
  const price = watch("price", []);

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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== RENTSTEPS.PRICE) {
      return onNext();
    }

    setLoading(true);

    if (
      selectedCategory == "" ||
      selectedCountry == null ||
      selectedImageSrc == "" ||
      title == "" ||
      description == "" ||
      price == 0
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(RENTSTEPS.CATEGORY);
        setRentSheetOpen();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
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

  if (step === RENTSTEPS.DESCRIPTION) {
    bodyContent = (
      <Card>
        <CardHeader>
          <CardTitle>How would you describe your place ?</CardTitle>
          <CardDescription>Short and Sweet works best!</CardDescription>
        </CardHeader>

        <CardContent>
          <Label typeof={"text"} htmlFor={"title"}>
            Title
          </Label>
          <Input
            {...register("title")}
            id={"title"}
            type={"text"}
            value={title}
            onChange={(title) => setCustomValue("title", title.target.value)}
            placeholder={"Best Title for your place"}
            disabled={loading}
            className={"font-bold"}
            required
          />
        </CardContent>
        <CardContent>
          <Label typeof={"text"} htmlFor={"description"}>
            Description
          </Label>
          <Textarea
            {...register("description")}
            value={description}
            onChange={(description) =>
              setCustomValue("description", description.target.value)
            }
            id={"description"}
            placeholder={"Describe your place"}
            className={"font-bold"}
            disabled={loading}
            required
          />
        </CardContent>
      </Card>
    );
  }

  if (step === RENTSTEPS.PRICE) {
    bodyContent = (
      <Card>
        <CardHeader>
          <CardTitle>Now , set u r price</CardTitle>
          <CardDescription>How much do u charge per night ?</CardDescription>
        </CardHeader>
        <CardContent className={"flex items-center gap-5"}>
          <Dollar02Icon className={"font-bold"} />
          <Input
            {...register("price")}
            id={"price"}
            value={price}
            onChange={(price) => setCustomValue("price", price.target.value)}
            placeholder={"Price"}
            type={"number"}
            className={"font-bold"}
            required
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {loading && (
        <div>
          <RotatingBars />
        </div>
      )}
      {!loading && (
        <div>
          <Toaster />
          <Modal
            title={"Air-BnB u r Home"}
            body={bodyContent}
            isOpen={isRentSheetOpen}
            onCLose={setRentSheetOpen}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === RENTSTEPS.CATEGORY ? undefined : onBack}
          />
        </div>
      )}
    </div>
  );
};

export default Rent;
