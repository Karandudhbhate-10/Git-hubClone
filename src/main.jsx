import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ProjectRoutes from "./Routes";
import { AuthProvider } from "./authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProjectRoutes />
    </AuthProvider>
  </BrowserRouter>
);
