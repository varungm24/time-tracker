import React, { ReactNode, useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./screens/dashboard";
import App from "./App";
import { Calender } from "./screens/calender";

const LaunchScreen = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const user = await Auth.currentAuthenticatedUser();
  //       const userEmail =
  //         user?.attributes?.email ||
  //         user?.signInUserSession?.idToken?.payload?.email;

  //       if (
  //         user?.signInUserSession?.idToken?.payload?.[
  //           "custom:isFirstTimeLogin"
  //         ] === "true"
  //       ) {
  //         navigate("/basic-details", { replace: true });
  //       } else if (userEmail) {
  //         navigate("/product-list", { replace: true });
  //       } else {
  //         navigate("/login", { replace: true });
  //       }
  //     } catch (error) {
  //       return navigate("/login", { replace: true });
  //     }
  //   })();
  // }, []);

  return null;
};

export const AppRouter = () => {
  return (
    <Router>
      <Stack />
    </Router>
  );
};

const publicRoute = [
  "/register",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/basic-details",
];

const Stack = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   Hub.listen("auth", async ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "cognitoHostedUI":
  //         if (data.username.toLowerCase().startsWith("google")) {
  //           navigate("/product-list", { replace: true });
  //           localStorage.setItem(
  //             "email",
  //             data?.signInUserSession?.idToken?.payload?.email
  //           );
  //           if (
  //             data?.signInUserSession?.idToken?.payload?.[
  //               "custom:isFirstTimeLogin"
  //             ] === "true"
  //           ) {
  //             navigate("/basic-details", { replace: true });
  //           }
  //         }
  //         break;
  //       case "tokenRefresh":
  //         break;
  //       case "signOut":
  //         break;
  //       case "parsingCallbackUrl":
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (location?.pathname === "/") return;
  //   (async () => {
  //     try {
  //       const user = await Auth.currentAuthenticatedUser();
  //       const userEmail =
  //         user?.attributes?.email ||
  //         user?.signInUserSession?.idToken?.payload?.email;
  //       if (
  //         userEmail &&
  //         publicRoute.includes(location?.pathname) &&
  //         user?.signInUserSession?.idToken?.payload?.[
  //           "custom:isFirstTimeLogin"
  //         ] === "false"
  //       ) {
  //         navigate("/product-list", { replace: true });
  //       } else if (!userEmail && !publicRoute.includes(location?.pathname)) {
  //         navigate("/login", { replace: true });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [location]);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};
