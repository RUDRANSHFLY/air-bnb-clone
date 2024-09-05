import React from "react";
import { SafeListings, SafeUser } from "../../../typings";
import ListingsCard from "../card/ListingsCard";

interface FavouriteClientProps {
  lisitngs: SafeListings[];
  currentUser?: SafeUser | null;
}

const FavouriteClient = ({ currentUser, lisitngs }: FavouriteClientProps) => {
  return (
    <div>
      <div className={"flex flex-col gap-2 font-mono"}>
        <h1 className={"text-3xl text-black font-bold"}>Favorites</h1>
        <h2 className={"text-md font-semibold italic text-neutral-600"}>
          List of places you have favorited!
        </h2>
      </div>
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
