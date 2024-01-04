import React, { ReactNode, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

interface Props {
  children?: ReactNode;
  customClass?: string;
  centered?: boolean;
  id?: string;
}

const TextArea = ({ children, customClass, centered, id }: Props) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      id={id ? id : ""}
      className={`${customClass} ${darkMode ? "dark" : ""} ${
        centered ? "centered-container" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default TextArea;
