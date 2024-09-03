import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingbyId";
import getReservations from "@/actions/getReservations";
import ListingClient from "@/components/card/ListingClient";
import EmptyState from "@/components/rent/EmptyState";
import React from "react";
import { Toaster } from "react-hot-toast";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservation = await getReservations(params);

  if (!listing) {
    return (
      <div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      {/* <NavBar currentUser={currentUser} /> */}
      <div className={"pt-28 pb-20"}>
        <ListingClient
          listing={listing}
          currentUser={currentUser}
          reservation={reservation}
        />
      </div>
    </div>
  );
};

export default ListingPage;
