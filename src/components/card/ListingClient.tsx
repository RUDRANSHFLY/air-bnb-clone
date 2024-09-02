"use client";

import { Listing, Reservation, User } from "@prisma/client";
import React, { useMemo } from "react";
import { categories } from "../../../types";
import Container from "../helper/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: Listing & { user: User };
  currentUser?: User | null;
}

const ListingClient = ({
  listing,
  currentUser,
  reservation,
}: ListingClientProps) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div>
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;
