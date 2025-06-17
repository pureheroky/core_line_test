import React from "react";
import Typography from "./ui/Typography";
import { poweredby } from "@assets/images";
import { links } from "@utils/constants";

const Footer = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6">
      <div className="flex flex-row gap-5">
        {links.map((link, idx) => (
          <Typography key={idx} className="text-[14px]">
            {link}
          </Typography>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Typography className="text-[14px]">Powered by</Typography>
        <div className="w-[84px] h-[25px]">
          <img
            src={poweredby}
            alt="poweredby"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <Typography className="text-[14px] pb-2">
          © 2023 Besider. Inspired by Insider
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
