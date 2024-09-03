"use client";
import { MenuIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import MenuItems from "./MenuItems";
import { useStore } from "@/store/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "../../../typings";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const handleSignIn = useStore((state) => state.setSignInSheetOpen);
  const handleSignUp = useStore((state) => state.setSignUpSheetOpen);
  const handleRent = useStore((state) => state.setRentModalSheetOpen);
  const handleSignOut = () => {
    signOut();
  };

  const handleOnRent = () => {
    if (!currentUser) {
      handleSignIn();
      return;
    }
    handleRent();
  };

  const router = useRouter();

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
            <p onClick={handleOnRent}>Airbnb your Home</p>
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
                  <AvatarImage
                    src={currentUser?.image || "/images/placeholder.webp"}
                  />
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
          <SheetClose asChild>
            <div className={"flex flex-col cursor-pointer"}>
              {currentUser ? (
                <>
                  <MenuItems
                    itemOnClick={() => {
                      router.push("/trips");
                    }}
                    label={"My Trips"}
                  />
                  <MenuItems itemOnClick={() => {}} label={"My favorites"} />
                  <MenuItems
                    itemOnClick={() => {
                      router.push("/reservation");
                    }}
                    label={"My reservation"}
                  />
                  <MenuItems itemOnClick={() => {}} label={"My properties"} />
                  <MenuItems
                    itemOnClick={handleOnRent}
                    label={"Air-BnB my home"}
                  />
                  <hr />
                  <MenuItems itemOnClick={handleSignOut} label={"Sign Out"} />
                </>
              ) : (
                <>
                  <MenuItems itemOnClick={handleSignUp} label={"Sign Up"} />
                  <MenuItems itemOnClick={handleSignIn} label={"Sign In"} />
                </>
              )}
            </div>
          </SheetClose>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default UserMenu;
