import useCountries from "@/actions/getCountires";
import { Listing, User } from "@prisma/client";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { Avatar, AvatarImage } from "../ui/avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  user: User;
  category:
    | {
        icon: ReactElement;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathRoomCount: number;
  locationValue: string;
}

const ListingInfo = ({
  bathRoomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.lating;

  const Map = dynamic(() => import("../maps/Map"), {
    ssr: false,
  });

  return (
    <div className={"col-span-4 flex flex-col gap-8"}>
      <div className={"flex flex-col gap-2"}>
        <div
          className={"text-xl font-semibold flex flex-row items-center gap-2"}
        >
          <h2>Hosted By {user?.name}</h2>
          <Avatar>
            <AvatarImage
              src={user.image || "/images/placeholder.webp"}
              className={
                "cursor-pointer transition-transform hover:border-2 hover:border-gray-500 hover:border-normal"
              }
            />
          </Avatar>
        </div>
        <div
          className={
            "flex flex-row items-center gap-4 font-light text-neutral-500"
          }
        >
          <div>
            <p>{guestCount} Guests</p>
          </div>
          <div className={"font-normal"}>
            <p>|</p>
          </div>
          <div>
            <p>{roomCount} Rooms</p>
          </div>
          <div className={"font-normal"}>
            <p>|</p>
          </div>
          <div>
            <p>{bathRoomCount} BathRooms</p>
          </div>
        </div>
        <hr />
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        <hr />
        <div className={"text-lg font-light text-neutral-500"}>
          {description}
        </div>
        <hr />
        <Map center={coordinates} />
      </div>
    </div>
  );
};

export default ListingInfo;
