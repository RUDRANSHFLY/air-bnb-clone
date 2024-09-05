import React from "react";
import EmptyState from "@/components/rent/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import TripsClient from "@/components/card/trips/TripsClient";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

const TripPage = async () => {
  const currentUser = await getCurrentUser();
  const reservation = await getReservations({
    userId: currentUser?.id,
  });

  if (!currentUser) {
    return (
      <div className={"relative"}>
        <EmptyState title={"UnAuthorized"} subtitle={"Please Login "} />
      </div>
    );
  }

  if (reservation.length === 0) {
    return (
      <div className={"relative"}>
        <EmptyState
          title={"No Trips found"}
          subtitle={"looks like you have't reserved any trips. "}
        />
      </div>
    );
  }

  return (
    <div className={"relative"}>
      <Toaster />
      <div className={"pt-28 pb-20"}>
        <TripsClient reservation={reservation} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default TripPage;
