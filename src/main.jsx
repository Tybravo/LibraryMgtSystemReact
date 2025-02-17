import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import SessionTimeout from "./auth/SessionTimeout.jsx"; // Import session timeout logic

const Main = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <SessionTimeout /> {/* Ensures session timeout is active globally */}
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

// Render the app
createRoot(document.getElementById("root")).render(<Main />);
