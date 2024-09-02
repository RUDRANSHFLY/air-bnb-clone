"use client";

import useCountries from "@/actions/getCountires";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../helper/HeartButton";
import ButtonHelper from "../helper/ButtonHelper";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId: string;
  currentUser?: User | null;
}

const ListingsCard = ({
  actionId,
  currentUser,
  data,
  onAction,
  actionLabel,
  disabled,
  reservation,
}: ListingCardProps) => {
  const router = useRouter();
  const getByValue = useCountries().getByValue;
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  function truncateString(str: string, limit: number) {
    if (str.length > limit) {
      return str.slice(0, limit - 3) + "...";
    }
    return str;
  }

  return (
    <div
      onClick={() => router.push(`listings/${data.id}`)}
      className={"col-span-1 cursor-pointer group "}
    >
      <div className={"flex flex-col gap-2 w-full"}>
        <div
          className={"aspect-square w-full relative overflow-hidden rounded-xl"}
        >
          <Image
            alt={"Listings"}
            src={data.imageSrc}
            fill
            className={
              "object-cover w-full h-full group-hover:scale-110 transition-transform"
            }
          />
          <div className={"absolute className top-3 right-3"}>
            <HeartButton listingID={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className={"font-semibold text-lg"}>
          {location?.region} ,{" "}
          {truncateString(location?.Label ? location?.Label : "", 15)}
        </div>
        <div className={"font-light text-neutral-500 tracking-wider"}>
          {reservationDate || data.category}
        </div>
        <div className={"flex flex-row items-center gap-1"}>
          <div className={"font-semibold"}>$ {price}</div>
          {!reservation && (
            <div className={"font-light"}>
              <p>night</p>
            </div>
          )}
        </div>
        {onAction && actionLabel && (
          <ButtonHelper
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingsCard;
