import React, { ReactNode, useEffect, useRef } from "react";


interface Props {
  children: ReactNode;
  onExitScreen?: () => void;
  onEnterScreen?: () => void;
}

const Annotation = ({ children, onExitScreen, onEnterScreen }: Props) => {

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && onEnterScreen) {
          onEnterScreen();
        }
        else if (!entry.isIntersecting && onExitScreen){
          onExitScreen();
        }
      })

    })
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);


  return (
    <div ref={ref} className="annotation-container">
      <div className="annotation-card">{children}</div>
    </div>
  );
};

export default Annotation;
