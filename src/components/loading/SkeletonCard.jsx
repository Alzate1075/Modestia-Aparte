import React, { useEffect, useState } from "react";

const SkeletonCard = ({ count = 4 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6 py-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 animate-pulse rounded-xl shadow-lg h-[400px] w-[250px]"
        />
      ))}
    </div>
  );
};

export default SkeletonCard;
