import React from "react";

const CardContainer = ({ children }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 px-4">
      {children}
    </div>
  );
};

export default CardContainer;
