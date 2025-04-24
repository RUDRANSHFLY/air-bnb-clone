"use client";

import Container from "@/components/helper/Container";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ListingsCard from "../ListingsCard";
import { SafeResevations, SafeUser } from "../../../../typings";
import Heading from "@/components/helper/Heading";

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
      <Heading
        title={"Trips"}
        subTitle={"Where you've been and where you're going"}
      />
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
