import React from "react";
import { Outlet } from "react-router-dom";

const ThreeNavbar = () => {
  return (
    <>
      <nav className="three-nav">
        <a href="#/three">Sphere</a>
        <ul>
          <a href="/">Go Back</a>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default ThreeNavbar;
