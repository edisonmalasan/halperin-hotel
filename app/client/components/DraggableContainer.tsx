// component for a draggable grid card
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center rounded-lg bg-gray-200 dark:bg-neutral-800">
      {children}
    </div>
  );
};

export default Container;
