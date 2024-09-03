import React, { Suspense } from "react";
import Container from "../helper/Container";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Category from "../category/Category";
import { SafeUser } from "../../../typings";

interface NavBarProps {
  currentUser?: SafeUser | null;
}

const NavBar = async ({ currentUser }: NavBarProps) => {
  return (
    <nav className={"fixed w-full bg-white z-10 shadow-sm"}>
      <div className={"py-4 border-b-[1px]"}>
        <Container>
          <div
            className={
              "flex flex-row items-center justify-between gap-3 md:gap-0"
            }
          >
            <Logo />
            <SearchBox />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Suspense>
        <Category />
      </Suspense>
    </nav>
  );
};

export default NavBar;
