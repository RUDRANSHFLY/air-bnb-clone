"use client";

import React from "react";
import Container from "../helper/Container";
import {
  Beach02Icon,
  CampfireIcon,
  Castle02Icon,
  DesertIcon,
  Diamond02Icon,
  FishFoodIcon,
  House05Icon,
  IslandIcon,
  LakeIcon,
  MoonLandingIcon,
  PoolIcon,
  SkiIcon,
  SnowIcon,
  TractorIcon,
  TsunamiIcon,
  WindTurbineIcon,
} from "hugeicons-react";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { Mountain } from "lucide-react";

export const categories = [
  {
    label: "Beach",
    icon: <Beach02Icon />,
    description: "This property is close to the beach!",
  },
  {
    label: "WindMills",
    icon: <WindTurbineIcon />,
    description: "This property is close to the windMills!",
  },
  {
    label: "Modern",
    icon: <House05Icon />,
    description: "This property is modern!",
  },
  {
    label: "Pool",
    icon: <PoolIcon />,
    description: "This property is pool!",
  },
  {
    label: "Sea",
    icon: <TsunamiIcon />,
    description: "This property is near sea!",
  },
  {
    label: "CountrySide",
    icon: <Mountain />,
    description: "This property is at Mountain!",
  },
  {
    label: "Islands",
    icon: <IslandIcon />,
    description: "This property is at icon!",
  },
  {
    label: "Lake",
    icon: <LakeIcon />,
    description: "This property is near lake!",
  },
  {
    label: "Skiing",
    icon: <SkiIcon />,
    description: "this properties has skeeing activities!",
  },
  {
    label: "Castles",
    icon: <Castle02Icon />,
    description: "this is in he castle",
  },
  {
    label: "Fishing",
    icon: <FishFoodIcon />,
    description: "this is as Fishing actvities!",
  },
  {
    label: "CampFire",
    icon: <CampfireIcon />,
    description: "this is as Camp `Fire actvities!",
  },
  {
    label: "Arctic",
    icon: <SnowIcon />,
    description: "this is as Snow Weather!",
  },

  {
    label: "Desert",
    icon: <DesertIcon />,
    description: "this is in the Desert!",
  },

  {
    label: "Cave",
    icon: <MoonLandingIcon />,
    description: "this is in the Cave!",
  },

  {
    label: "Barns",
    icon: <TractorIcon />,
    description: "this is in the Cave!",
  },
  {
    label: "Lux",
    icon: <Diamond02Icon />,
    description: "this is property is luxurious!",
  },
];

const Category = () => {
  const params = useSearchParams();
  const selectedCategory = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div>
      <Container>
        <div
          className={
            "pt-4 flex flex-row items-center justify-between overflow-x-auto"
          }
        >
          {categories.map((category) => (
            <CategoryBox
              key={category.label}
              name={category.label}
              desc={category.description}
              icon={category.icon}
              selected={category.label === selectedCategory}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Category;
