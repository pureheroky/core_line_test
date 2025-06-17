import React from "react";
import Typography from "./ui/Typography";
import { hamburger } from "@assets/images";

interface NavbarProps {
  onHamburgerClick: () => void;
}

const Navbar = ({ onHamburgerClick }: NavbarProps) => {
  return (
    <div className="sticky top-0 bg-white z-40 flex justify-center items-center h-[72px] px-5 border-b-1 border-gray-200">
      <div className="flex-none" onClick={onHamburgerClick}>
        <img src={hamburger} alt="hamburger" />
      </div>
      <div className="flex-1 flex justify-center">
        <Typography className="text-[24px] font-bold tracking-[10%]">
          BESIDER
        </Typography>
      </div>
      <div className="flex-none w-5" />
    </div>
  );
};

export default Navbar;
