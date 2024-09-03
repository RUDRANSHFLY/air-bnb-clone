import client from "@/libs/prsimaDB";

export default async function getListings() {
  try {
    const listings = client.listing.findMany({
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
