import { createRoot } from "react-dom/client";
import "./lib/animations"; // registers GSAP ScrollTrigger plugin once
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);
