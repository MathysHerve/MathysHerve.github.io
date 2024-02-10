import React from "react";
import { Outlet } from "react-router-dom";

const ThreeNavbar = () => {
  return (
    <div className="three">
      <nav>
        <a href="/three">Sphere</a>
        <ul>
          <a href="/">Go Back</a>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default ThreeNavbar;
