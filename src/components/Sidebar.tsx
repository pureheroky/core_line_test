import Typography from "@ui/Typography";
import React from "react";
import { close } from "@assets/images";
import { newsType } from "@utils/constants";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <aside
      className={`
      fixed inset-0 z-50 bg-white transition-transform duration-300
      flex flex-col
      ${open ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <button className="p-4 self-end" onClick={onClose}>
        <img src={close} width={20} height={20} alt="close" />
      </button>

      <nav className="flex flex-1 flex-col items-start justify-center gap-7 px-5">
        {newsType.map((t) => (
          <button key={t} onClick={onClose}>
            <Typography className="text-[22px] font-bold tracking-[0.1em]">
              {t}
            </Typography>
          </button>
        ))}
      </nav>
      <div className="flex-none h-14" />
    </aside>
  );
};

export default Sidebar;
