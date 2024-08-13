import React from "react";
import Container from "../helper/Container";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import UserMenu from "./UserMenu";

const NavBar = () => {
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
            <UserMenu />
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default NavBar;
