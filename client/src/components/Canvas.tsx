import React, { Children, ReactNode } from "react";

interface Props {
  label: string;
  animationContainer: ReactNode;
  annotationContainer: ReactNode;
}

const Canvas = ({ label, animationContainer, annotationContainer }: Props) => {
  return (
    <div className={`canvas canvas-${label}`}>
      <div className="annotation-canvas">{annotationContainer}</div>
      <div className="animation-canvas">{animationContainer}</div>
    </div>
  );
};

export default Canvas;
