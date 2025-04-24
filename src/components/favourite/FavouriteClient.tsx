import React from "react";
import { SafeListings, SafeUser } from "../../../typings";
import ListingsCard from "../card/ListingsCard";
import Heading from "../helper/Heading";

interface FavouriteClientProps {
  lisitngs: SafeListings[];
  currentUser?: SafeUser | null;
}

const FavouriteClient = ({ currentUser, lisitngs }: FavouriteClientProps) => {
  return (
    <div>
      <Heading
        title={"Favorites"}
        subTitle={"List of places you have favorited!"}
      />
      <div
        className={
          "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        }
      >
        {lisitngs.map((listing) => (
          <ListingsCard
            data={listing}
            actionId={listing.id}
            key={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default FavouriteClient;
