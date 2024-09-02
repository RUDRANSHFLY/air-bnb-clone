import client from "@/libs/prsimaDB";

interface IParams {
  listingID?: string;
}

export default async function getListingByID(params: IParams) {
  const { listingID } = params;

  const listing = await client?.listing.findUnique({
    where: {
      id: listingID,
    },
    include: {
      user: true,
    },
  });

  if (!listing) {
    return null;
  }

  return {
    ...listing,
    user: {
      ...listing.user,
    },
  };
}
