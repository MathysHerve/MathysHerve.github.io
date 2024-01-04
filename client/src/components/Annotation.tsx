import React, { ReactNode, useEffect } from "react";

export enum AnnotationEffect {
  "ON_SCROLL_BELOW",
  "ON_SCROLL_ABOVE",
  "ON_ENTER_SCREEN",
}

interface Props {
  children: ReactNode;
  effect?: {}; // TODO
}

const Annotation = ({ children, effect }: Props) => {
  const onEnterScreenEffect =
    !!effect && (effect[AnnotationEffect.ON_ENTER_SCREEN] ?? null);

  const onScrollAbove =
    !!effect && (effect[AnnotationEffect.ON_SCROLL_ABOVE] ?? null);

  const onScrollBelow =
    !!effect && (effect[AnnotationEffect.ON_SCROLL_BELOW] ?? null);

  return (
    <div className="annotation-container">
      <div className="annotation-card">{children}</div>
    </div>
  );
};

export default Annotation;
