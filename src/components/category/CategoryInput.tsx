import { cn } from "@/lib/utils";
import React, { ReactElement } from "react";

interface CategoryInputProps {
  icon: ReactElement;
  categoryName: string;
  categorySelected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  categoryName,
  icon,
  onClick,
  categorySelected,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(categoryName)}
      className={cn(
        "rounded-xl  border-2 p-4 flex md:flex-col gap-3 hover:border-black transition-colors cursor-pointer",
        categorySelected ? "border-black" : "border-neutral-200"
      )}
    >
      {icon}
      <div>
        <p className={"font-semibold"}>{categoryName}</p>
      </div>
    </div>
  );
};

export default CategoryInput;
