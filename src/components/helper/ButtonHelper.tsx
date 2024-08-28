import React from "react";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "lucide-react";

interface ButtonHelperProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const ButtonHelper = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  outline,
  small,
}: ButtonHelperProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        `relative w-full tracking-wider hover:bg-black hover:text-white
        ${
          outline
            ? "bg-white border-black text-black "
            : "bg-rose-500 border-rose-500 text-white"
        }
        ${
          small
            ? "py-1 text-sm font-light border-[1px]"
            : "py-3 text-lg font-semibold border-2"
        }    
        `
      )}
    >
      {Icon && <Icon size={24} className={"absolute left-4 top-3"} />}
      {label}
    </Button>
  );
};

export default ButtonHelper;
