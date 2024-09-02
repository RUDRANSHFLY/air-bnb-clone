"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Listing, Reservation, User } from "@prisma/client";
import { useStore } from "@/store/store";
import { categories } from "../../../types";
import Container from "../helper/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: Listing & { user: User };
  currentUser?: User | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient = ({
  listing,
  currentUser,
  reservation = [],
}: ListingClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const router = useRouter();
  const openSignInSheet = useStore((state) => state.setSignInSheetOpen);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return openSignInSheet();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations/", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingID: listing?.id,
      })
      .then(() => {
        toast.success("Reservation Done");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    openSignInSheet,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dateCount && listing.price) {
        setTotalPrice(dateCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }

    return () => {};
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservation]);

  return (
    <Container>
      <div className={"max-w-screen-lg mx-auto"}>
        <div className={"flex flex-col gap-6"}>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6"}>
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathRoomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div className={"order-first mb-10 md:order-last md:col-span-3"}>
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value: Range) => {
                setDateRange(value);
              }}
              onSubmit={onCreateReservation}
              dateRange={dateRange}
              disabledDates={disabledDates}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
