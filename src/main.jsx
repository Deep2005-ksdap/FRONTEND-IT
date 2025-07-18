import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateStock from "./assets/components/CreateStock.jsx";
import Dashboard from "./assets/components/Dashboard.jsx";
import Home from "./assets/components/Home.jsx";
import App from "./App.jsx";
import NotFoundPage from "./assets/components/NotFoundPage.jsx";
import LoginPage from "./assets/components/LoginPage.jsx";
import RegistrationPage from "./assets/components/RegistrationPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/home/add-item",
        element: <CreateStock />,
      },
      {
        path: "/home/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/user/login",
    element: <LoginPage />,
  },
  {
    path: "/user/register",
    element: <RegistrationPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
