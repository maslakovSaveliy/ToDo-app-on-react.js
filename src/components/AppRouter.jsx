import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../router/routes";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      {routes.map((route) => (
        <Route element={<route.component />} path={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
};
export default AppRouter;
