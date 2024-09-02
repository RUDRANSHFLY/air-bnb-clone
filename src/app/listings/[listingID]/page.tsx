import getCurrentUser from "@/actions/getCurrentUser";
import getListingByID from "@/actions/getListingbyID";
import ListingClient from "@/components/card/ListingClient";
import NavBar from "@/components/navbar/NavBar";
import EmptyState from "@/components/rent/EmptyState";
import React from "react";

interface IParams {
  listingID?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingByID(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div>
      <NavBar currentUser={currentUser} />
      <div className={"pt-28 pb-20"}>
        <ListingClient listing={listing} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ListingPage;
