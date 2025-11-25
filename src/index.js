import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotFound from "./NotFound";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/Xperts-Frontend">
    <Routes>
      <Route path="/*" element={<App />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
);
