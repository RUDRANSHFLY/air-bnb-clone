"use client";

import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import React from "react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
  const hasFavorited = true;
  const toggleFavorite = () => {};

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
