import React, { ReactNode } from "react";

interface Props {
  id: string;
  children?: ReactNode;
}

const Animation = ({ id, children }: Props) => {
  return (
    <div id={id} className="animation">
      {children}
    </div>
  );
};

export default Animation;
