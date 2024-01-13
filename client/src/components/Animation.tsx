import React, { ReactNode } from "react";

interface Props {
  id: string;
  children?: ReactNode;
}

const Animation = ({ id, children }: Props) => {
  return (
    <div data-id={id} className="animation">
      {children}
    </div>
  );
};

export default Animation;
