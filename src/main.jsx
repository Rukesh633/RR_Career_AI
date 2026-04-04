import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReactGA from "react-ga4";
ReactGA.initialize("G-ZWV8VFSQ89"); // Your ID here
ReactGA.send("pageview");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
