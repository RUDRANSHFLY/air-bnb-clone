import React from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { categories } from "../category/Category";
import CategoryInput from "../category/CategoryInput";

const CategoryModal = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Which of these best describes your place ?</CardTitle>
        <CardDescription>Pick a Category</CardDescription>
      </CardHeader>
      <CardContent
        className={
          "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-h-[50vh] overflow-y-scroll gap-4 scrollbar-hide"
        }
      >
        {categories.map((category) => (
          <div className={"col-span-1"} key={category.label}>
            {/* <CategoryInput
              icon={category.icon}
              categoryName={category.label}
              categorySelected={selectedCategory === category.label}
              onClick={(category) => setCustomValue("category", category)}
            /> */}
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default CategoryModal;
