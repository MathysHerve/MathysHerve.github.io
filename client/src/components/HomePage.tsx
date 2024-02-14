import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ThreeDText from "./ThreeDText";

const getStupidSVG = () => {
  return (
    <svg
      className="mx-auto my-2 card-image"
      fill="none"
      strokeLinecap="square"
      strokeMiterlimit="10"
      version="1.1"
      viewBox="0 0 226.77 226.77"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="translate(8.964 4.2527)"
        fillRule="evenodd"
        stroke="white"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="m63.02 200.61-43.213-174.94 173.23 49.874z" />
        <path d="m106.39 50.612 21.591 87.496-86.567-24.945z" />
        <path d="m84.91 125.03-10.724-43.465 43.008 12.346z" />
        <path d="m63.458 38.153 10.724 43.465-43.008-12.346z" />
        <path d="m149.47 62.93 10.724 43.465-43.008-12.346z" />
        <path d="m84.915 125.06 10.724 43.465-43.008-12.346z" />
      </g>
    </svg>
  );
};

const HomePage = () => {
  const [buttonVariant, setButtonVariant] = useState("outline-dark");

  useEffect(() => {
    const themeChangeListener = (event) => {
      const isDarkMode = document.body.dataset.bsTheme === "dark";
      console.log(isDarkMode);

      if (isDarkMode) {
        setButtonVariant("outline-light");
      } else {
        setButtonVariant("outline-dark");
      }
    };

    themeChangeListener(null);

    window.addEventListener("themeChanged", themeChangeListener);

    return () => {
      window.removeEventListener("themeChanged", themeChangeListener);
    };
  }, []);

  return (
    <>
      <ThreeDText text="Hi, I'm Mathys" />
      <Container>
        <Row
          className="justify-content-between"
          style={{ paddingBottom: 150, paddingTop: 100 }}
        >
          <Col xs="12" md="5" className="pb-5">
            <h2 id="about">About Me</h2>
            <p>
              I am a <b>Software Developer</b> driven by curiosity. Software is
              where I feel most creative and where I welcome all challenges. I
              graduated from <b>UC Berkeley</b> in 2024 and began my career with
              Web Development.
            </p>
            <p>
              This website is meant to be a playground/display for my
              curiosities. Keep scrolling to see some of the projects I have
              been a part of.
            </p>
          </Col>
          <Col xs="12" md="5">
            <h2 style={{ paddingBottom: 10 }}>Skills</h2>
            <ul className="skills">
              <li>Python</li>
              <li>Go</li>
              <li>C++</li>
              <li>TypeScript</li>
              <li>SQL</li>
              <li>Postgres</li>
              <li>Docker</li>
              <li>Git</li>
              <li>React</li>
              <li>HTML/CSS</li>
              <li>Computer Security</li>
              <li>Dynamic Programming</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs="auto">
            <h2 className="mb-3">Personal Projects</h2>
          </Col>
        </Row>
        <Row className="g-5" style={{ paddingBottom: 100 }}>
          <Col xs="auto">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                className="mx-auto my-2 card-image"
                variant="top"
                src="react.svg"
              />

              <Card.Body>
                <Card.Title>Personal Website</Card.Title>
                <Card.Text>
                  Created a React project using Vite + React + Flask.
                </Card.Text>
                <Button variant={buttonVariant}>See the Website</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="auto">
            <Card style={{ width: "18rem" }}>
              {getStupidSVG()}
              <Card.Body>
                <Card.Title>Three.js</Card.Title>
                <Card.Text>
                  Made interactive 3D frontend with Three.js
                </Card.Text>
                <Button variant={buttonVariant} href="#/three">
                  Go to 3D Stuff
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
