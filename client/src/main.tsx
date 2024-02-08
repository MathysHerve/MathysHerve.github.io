import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.css";

import "./scss/styles.scss"
import "./scss/Page.scss"



ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
