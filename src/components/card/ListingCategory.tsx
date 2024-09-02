import React, { ReactElement } from "react";

interface ListingCategoryProps {
  icon: ReactElement;
  label: string;
  description: string;
}

const ListingCategory = ({
  description,
  icon,
  label,
}: ListingCategoryProps) => {
  return (
    <div className={"flex flex-col gap-6"}>
      <div className={"flex flex-row items-center gap-4"}>
        {icon}
        <div className={"flex flex-col"}>
          <div className={"text-lg font-semibold"}>
            <p>{label}</p>
          </div>
          <div className={"text-neutral-500 font-light"}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
