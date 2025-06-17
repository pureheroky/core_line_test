import React from "react";

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const Link = ({ children, className, href }: LinkProps) => {
  return (
    <a
      href={href}
      className={`font-lato text-blue-600` + className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;
