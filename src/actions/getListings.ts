import client from "@/libs/prsimaDB";

export default async function getListings() {
  try {
    const listings = client.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
