import React, { useContext } from "react";
import Canvas from "../../../components/Canvas";
import Annotation, { AnnotationEffect } from "../../../components/Annotation";
import { DarkModeContext } from "../../../DarkModeContext";
import TextArea from "../../../components/TextArea";
import Animation from "../../../components/Animation";

const Knapsack = () => {
  const { darkMode } = useContext(DarkModeContext);
  const annotationContainer = (
    <div>
      <Annotation>
        <p>
          p that is quite long and should hopefully make the thing do the thigns
          what do yo think i want there to be like what the fuck
        </p>
      </Annotation>
      <Annotation>test 2</Annotation>
    </div>
  );
  const animationContainer = (
    <div>
      <Animation id="test"></Animation>
    </div>
  );

  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <TextArea customClass="intro-title" centered={true}>
        <h1>Knapsack</h1>
      </TextArea>
      <TextArea customClass="intro-algorithm" centered={true}>
        <p>
          &ensp;Knapsack is a famous NP-Complete problem that has been solved in
          pseudo-polynomial time thanks to Dynamic Programming!<br></br>
          <br></br>
        </p>
      </TextArea>

      <Canvas
        label="intro"
        animationContainer={animationContainer}
        annotationContainer={annotationContainer}
      ></Canvas>
    </div>
  );
};

export default Knapsack;
