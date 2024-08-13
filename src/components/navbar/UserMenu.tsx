"use client";
import { MenuIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import MenuItems from "./MenuItems";

const UserMenu = () => {
  return (
    <Sheet>
      <div className={"relative"}>
        <div className={"flex flex-row items-center gap-3"}>
          <div
            onClick={() => {}}
            className={
              "hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            }
          >
            <p>Airbnb your Home</p>
          </div>
          <SheetTrigger>
            <div
              className={
                "p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition-shadow cursor-pointer"
              }
            >
              <MenuIcon />
              <div className={"hidden md:block"}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={"/images/placeholder.webp"} />
                </Avatar>
              </div>
            </div>
          </SheetTrigger>
        </div>
        <SheetContent
          className={
            "w-52 h-fit absolute top-16 right-16 rounded-xl shadow-md text-sm overflow-hidden"
          }
        >
          <div className={"flex flex-col cursor-pointer"}>
            <MenuItems itemOnClick={() => {}} label={"Sign Up"} />

            <MenuItems itemOnClick={() => {}} label={"Sign In"} />
          </div>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default UserMenu;
