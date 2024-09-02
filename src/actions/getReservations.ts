import client from "@/libs/prsimaDB";

interface IParams {
  listingID?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { authorId, listingID, userId } = params;

    const query: any = {};

    if (listingID) {
      query.listingId = listingID;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listingId = { userId: authorId };
    }

    const reservations = await client.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
