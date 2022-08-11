import { React, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { privateRoutes, publicRoutes } from "../router/routes";
import Loader from "./UI/Loader/Loader";
const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route, index) => (
        <Route path={route.path} element={<route.element />} key={index} />
      ))}
      <Route path="/login" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route path={route.path} element={<route.element />} key={index} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
export default AppRouter;
