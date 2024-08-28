import { NextResponse } from "next/server";
import client from "@/libs/prsimaDB";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  listingID?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingID } = params;

  if (!listingID || typeof listingID !== "string") {
    throw new Error("Invalid Id");
  }

  let favouriteIds = [...(currentUser.favoriteIds || [])];

  favouriteIds.push(listingID);

  const user = await client?.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favouriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingID } = params;

  if (!listingID || typeof listingID !== "string") {
    throw new Error(`Invalid ID`);
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingID);

  const user = await client.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}
