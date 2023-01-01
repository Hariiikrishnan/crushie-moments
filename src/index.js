import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { useNavigate } from "react-router";
import { Navigate, Route, Routes } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <BrowserRouter>
    <Routes>
    <Route exact path="/" element={
      
    } /> */}
      <App />
    {/* </Routes>
    </BrowserRouter> */}
  </StrictMode>
  
);
