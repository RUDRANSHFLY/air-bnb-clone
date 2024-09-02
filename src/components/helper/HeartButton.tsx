"use client";

import { useFavorite } from "@/hooks/getFavourite";
import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import React from "react";
import { SafeUser } from "../../../typings";

interface HeartButtonProps {
  listingID: string;
  currentUser?: User | null;
}

const HeartButton = ({ currentUser, listingID }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingID,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className={"relative cursor-pointer hover:opacity-80 transition-shadow"}
    >
      <Heart
        size={28}
        className={` text-white absolute -top-[2px] -right-[2px] ${
          hasFavorited ? "fill-rose-500 " : "fill-neutral-400"
        }`}
      />
    </div>
  );
};

export default HeartButton;
