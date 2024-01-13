import React, { useContext, useEffect, useState } from "react";
import Canvas from "../../../components/Canvas";
import Annotation, { AnnotationEffect } from "../../../components/Annotation";
import { DarkModeContext } from "../../../DarkModeContext";
import TextArea from "../../../components/TextArea";
import Animation from "../../../components/Animation";
import svg from "../../../assets/knapsack/duffle.svg"
import freezeElement from "../../../tsx/scrollTools";
import KnapsackAnimation from "./KnapsackAnimations";

const Knapsack = () => {
  const { darkMode } = useContext(DarkModeContext);

  const knapsackAnimation = new KnapsackAnimation();

  const annotationContainer = (
    <>
      <Annotation onEnterScreen={knapsackAnimation.play} onExitScreen={knapsackAnimation.reset}>
        <span>
          We are robbing a bank! We have an old bag, it can <b>only hold 10 kilograms of goodies</b>. The bank has several items of different weight and price. How can I calculate the <b>best possible cashout</b>?
        </span>
      </Annotation>
      <Annotation>
        <span>
          We will use Dynamic Programming to figure this out! To do that, we will <b>break the problem up</b>. Let's figure out the best items to steal for a bag that can <b>only hold 1 kilogram</b> first.
        </span>
      </Annotation>
      <Annotation>
        <span>
          Let's <b>check each item</b> and see if it fits in our small bag, and let's <b>keep track</b> of the final cashout in our notes! The diamond and gold are too heavy, but the <b>bracelet</b> fits. Our cashout is $1,000!
        </span>
      </Annotation>
      <Annotation>
        <span>
          Now we can use our notes to quickly calculate the <b>best cashout</b> for a bag that can fit <b>2 kilograms.</b> But first, let's start with gold. It cannot fit!
        </span>
      </Annotation>
      <Annotation>
        <span>
          If we take a diamond, we are left with 0 kilograms. So our cashout here is $10,000. 
        </span>
      </Annotation>
      <Annotation>
        <span>
          If we take a bracelet, we are left with 1 kilogram. Thanks to our notes, the best cashout for the remaining 1 kilogram is $1,000. So in total, we have $2,000 cashout here.
        </span>
      </Annotation>
      <Annotation>
        <span>
          But if you noticed, the best cashout for capacity 2 is $10,000 if we take the diamond. So let's write that down in our notes.
        </span>
      </Annotation>
      <Annotation>
        <span>
          One more time, let's now calculate the best cashout for a bag that can fit 3 kilograms. 
        </span>
      </Annotation>
      <Annotation>
        <span>
          Seems like gold is still too heavy! 
        </span>
      </Annotation>
      <Annotation>
        <span>
          If we take a diamond, we are left with 1 kilogram. Again, our notes say the best cashout with 1 kilogram is $1,000, so we have a total of $11,000
        </span>
      </Annotation>
      <Annotation>
        <span>
          If we take a bracelet, we are left with 2 kilogram. Our notes say the best cashout with 2 kilograms is $10,000, so we have a total of $11,000. 
        </span>
      </Annotation>
      <Annotation>
        <span>
          So now we write the best cashout for a bag that holds 3kg as $11,000. We continue this until we get to our 10 kilogram bag from the original problem.
        </span>
      </Annotation>
    </>
  );
  const animationContainer = (
    <>

        <figure id="duffle"className="animation-img hidden" style={{width: "150px"}}>
          <h2>Duffle Bag</h2>
          <img src="/knapsack/duffle.svg"></img>
          <figcaption className="animation-label"></figcaption>
        </figure>
        
        <figure id="diamond" style={{width: "70px"}} className="animation-img hidden">
          <h2>Diamond</h2>
          <img src="/knapsack/diamond.svg" ></img>
          <figcaption className="animation-label"></figcaption>
        </figure>

        <figure id="gold" style={{width: "70px"}} className="animation-img hidden">
          <h2>Gold Bars</h2>
          <img src="/knapsack/gold.svg"></img>
          <figcaption className="animation-label"></figcaption>
        </figure>

        <figure id="bracelet" style={{width: "70px"}} className="animation-img hidden" >
          <h2>Bracelet</h2>
          <img src="/knapsack/bracelet.svg" ></img>
          <figcaption className="animation-label"></figcaption>
        </figure>

    </>
  );

  useEffect(() => {
    knapsackAnimation.populate();
    const animationDivs = document.getElementsByClassName('animation-canvas');
    const firstDiv = animationDivs[0]

    freezeElement(firstDiv);
  }, []);

  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <TextArea customClass="intro-title" centered={true}>
        <h1>Knapsack</h1>
      </TextArea>
      <TextArea customClass="intro-algorithm" centered={true}>
        <p>
          &ensp;The knapsack algorithm is a classic problem in combinatorial optimization, widely studied in computer science and applied mathematics. It revolves around a simple yet intriguing premise: given a set of items, each with a specific weight and value, the task is to determine the most valuable combination of these items to include in a knapsack, while respecting the weight limit of the knapsack. The challenge lies in making the optimal choice between the competing objectives of maximizing value and staying within the weight limit. This problem finds practical applications in resource allocation, budgeting, and even in complex decision-making scenarios in economics and logistics.<br></br> <br></br>

          There are several variations of the knapsack problem, but the most commonly encountered version is the 0/1 knapsack problem. In this scenario, each item can be chosen only once or not at all, resembling a binary decision. This problem is typically approached using dynamic programming, a method where the problem is broken down into simpler, overlapping subproblems, and then solved in a bottom-up manner. This approach is particularly effective as it avoids redundant computations of the same subproblems, a common issue in naive recursive solutions. Understanding the knapsack algorithm's principles and its dynamic programming solution provides valuable insights into both algorithm design and the art of balancing competing priorities in constrained optimization scenarios.
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
