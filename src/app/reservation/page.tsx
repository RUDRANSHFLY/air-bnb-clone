import Container from "@/components/helper/Container";
import EmptyState from "@/components/rent/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import React from "react";
import ReservationClient from "@/components/reservation/ReservationClient";
import { Toaster } from "react-hot-toast";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Container>
        <EmptyState title={"Un-Authorized"} subtitle={"please login"} />
      </Container>
    );
  }
  const reservation = await getReservations({
    authorId: currentUser?.id,
  });

  if (reservation.length === 0) {
    return (
      <Container>
        <EmptyState
          title={"No Reservation Found"}
          subtitle={"Looks like you have no reservation on your's proerty"}
        />
      </Container>
    );
  }
  return (
    <div className={"pt-28 pb-20"}>
      <Toaster />
      <Container>
        <ReservationClient
          reservation={reservation}
          currentUser={currentUser}
        />
      </Container>
    </div>
  );
};

export default page;
