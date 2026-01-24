import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`rounded-lg p-5 bg-white border border-gray/15 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Card;
