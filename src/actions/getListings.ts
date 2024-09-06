import client from "@/libs/prsimaDB";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  const {
    userId,
    bathroomCount,
    category,
    guestCount,
    roomCount,
    endDate,
    startDate,
    locationValue,
  } = params;

  let query: any = {};

  if (userId) {
    query.userId = userId;
  }

  if (category) {
    query.category = category;
  }

  if (roomCount) {
    query.roomCount = {
      gte: +roomCount,
    };
  }

  if (bathroomCount) {
    query.bathroomCount = {
      gte: +bathroomCount,
    };
  }

  if (guestCount) {
    query.guestCount = {
      gte: +guestCount,
    };
  }

  if (locationValue) {
    query.locationValue = locationValue;
  }

  if (startDate && endDate) {
    query.NOT = {
      reservation: {
        some: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: endDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
          ],
        },
      },
    };
  }
  try {
    const listings = client.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    const safeListings = (await listings).map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
