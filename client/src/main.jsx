import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LogContext from "./context/LogContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LogContext>
      <App />
    </LogContext>
  </React.StrictMode>
);
