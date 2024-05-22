import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import Router_APP from "./components/Header_Routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router_APP />
    <Toaster richColors />
  </React.StrictMode>
);
