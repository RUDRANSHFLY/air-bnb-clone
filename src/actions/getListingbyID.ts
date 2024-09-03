import client from "@/libs/prsimaDB";

interface IParams {
  listingID?: string;
}

export default async function getListingByID(params: IParams) {
  try {
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
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
