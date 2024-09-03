import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import client from "@/libs/prsimaDB";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error(`Invalid Error`);
  }

  const reservation = await client.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser?.id },
        { listing: { userId: currentUser?.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
