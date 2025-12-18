import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotFound from "./Helpers/NotFound";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Admin/Dashboard";
import UserDashboard from "./User/UserDashboard";
import UserProfile from "./User/UserProfile";
import RecommendExpert from "./User/RecommendExpert";
import ChangePassword from "./User/ChangePassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route path="profile" element={<UserProfile />}></Route>
          <Route path="recommend-expert" element={<RecommendExpert />}></Route>
          <Route path="change-password" element={<ChangePassword />}></Route>
        </Route>
        <Route path="/dashboard" element={<AdminDashboard />}></Route>
        <Route path="user-profile" element={<UserProfile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
