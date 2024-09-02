import useCountries from "@/actions/getCountires";
import { User } from "@prisma/client";
import Image from "next/image";
import HeartButton from "../helper/HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div>
      <div className={"flex flex-col gap-2 mb-5"}>
        <h1 className={"font-bold text-3xl tracking-wide"}>{title}</h1>
        <h2 className={"font-medium text-gray-500 text-base"}>
          {location?.region} {location?.Label}
        </h2>
      </div>
      <div className={"w-full h-[60vh] overflow-hidden rounded-xl relative"}>
        <Image
          alt={"Listing Image"}
          src={imageSrc}
          fill
          className={"object-cover w-full absolute"}
        />
        <div className={"absolute top-5 right-5"}>
          <HeartButton listingID={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
