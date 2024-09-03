"use client";

import Container from "@/components/helper/Container";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ListingsCard from "../ListingsCard";
import { SafeResevations, SafeUser } from "../../../../typings";

interface TripsClientProps {
  reservation: SafeResevations[];
  currentUser?: SafeUser;
}

const TripsClient = ({ reservation, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deltingID, setdeltingID] = useState(``);

  const onCancel = useCallback(
    (id: string) => {
      setdeltingID(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setdeltingID(``);
        });
    },
    [router]
  );

  return (
    <Container>
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-3xl text-black font-bold"}>Trips</h1>
        <h2 className={"text-md font-semibold italic text-neutral-600"}>
          Where you&apos;ve been and where you&apos;re going
        </h2>
      </div>
      <div
        className={
          "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        }
      >
        {reservation.map((reservation) => (
          <ListingsCard
            data={reservation.listing}
            key={reservation.id}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deltingID === reservation.id}
            actionLabel={"Cancel Reservation"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
