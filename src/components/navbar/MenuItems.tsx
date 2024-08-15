"use client";

import React from "react";

interface MenuItemsProps {
  itemOnClick: () => void;
  label: string;
}

const MenuItems = ({ label, itemOnClick }: MenuItemsProps) => {
  return (
    <div
      onClick={itemOnClick}
      className={
        "px-4 py-3 hover:bg-neutral-100 font-semibold transition-colors"
      }
    >
      <p className="itemsLink">{label}</p>
    </div>
  );
};

export default MenuItems;
