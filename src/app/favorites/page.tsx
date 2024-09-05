import React from "react";

import EmptyState from "@/components/rent/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import getFavouriteLisitings from "@/actions/getFavouriteListings";
import FavouriteClient from "@/components/favourite/FavouriteClient";
import Container from "@/components/helper/Container";

const FavourPage = async () => {
  const currentUser = await getCurrentUser();
  const lisitngs = await getFavouriteLisitings();

  if (lisitngs?.length === 0) {
    return (
      <div>
        <EmptyState
          title={"No favorite found"}
          subtitle={"Looks Like you have no favorite listings."}
        />
      </div>
    );
  }

  return (
    <div className={"pt-28 pb-20 "}>
      <Container>
        <FavouriteClient lisitngs={lisitngs} currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default FavourPage;
