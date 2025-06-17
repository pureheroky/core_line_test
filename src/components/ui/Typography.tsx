import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

const Typography = ({ children, className }: TypographyProps) => {
  return <p className={`font-lato ${className}`}>{children}</p>;
};

export default Typography;
