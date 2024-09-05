import React from "react";
import EmptyState from "@/components/rent/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import { Toaster } from "react-hot-toast";
import PropertiesClient from "@/components/properties/PropertiesClient";
import getListings from "@/actions/getListings";

export const dynamic = "force-dynamic";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({
    userId: currentUser?.id,
  });

  if (!currentUser) {
    return (
      <div className={"relative"}>
        <EmptyState title={"UnAuthorized"} subtitle={"Please Login "} />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className={"relative"}>
        <EmptyState
          title={"No Properties found"}
          subtitle={"looks like you have't Added any Properties. "}
        />
      </div>
    );
  }

  return (
    <div className={"relative"}>
      <Toaster />
      <div className={"pt-28 pb-20"}>
        <PropertiesClient lisitngs={listings} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default PropertiesPage;
