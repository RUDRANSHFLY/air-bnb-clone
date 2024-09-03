"use client";

import React, { useCallback, useState } from "react";
import { SafeResevations, SafeUser } from "../../../typings";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingsCard from "../card/ListingsCard";

interface ReservationClientProps {
  reservation: SafeResevations[];
  currentUser: SafeUser | null;
}

const ReservationClient = ({
  currentUser,
  reservation,
}: ReservationClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(``);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error(`Something went wrong`);
        })
        .finally(() => {
          setDeletingId(``);
        });
    },

    [router]
  );

  return (
    <div>
      <div className={"flex flex-col gap-2 font-mono"}>
        <h1 className={"text-3xl text-black font-bold"}>Reservation</h1>
        <h2 className={"text-md font-semibold italic text-neutral-600"}>
          Bookings on your properties
        </h2>{" "}
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((reservation) => (
          <ListingsCard
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            actionId={reservation.id}
            actionLabel={"Cancel Guest Reservation"}
            disabled={deletingId === reservation.id}
            key={reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ReservationClient;
