import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/home";
import Bookshelf from "./pages/bookshelf";
import Dashboard from "./pages/dashboard";
import ErrorElement from "./pages/errorElement";
import About from "./pages/about";
import Logout from "./pages/logout";
import Login from "./components/login";
import { UserProvider } from "./services/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorElement />,
    children: [
      {
        path:"/",
        element: <Dashboard />
      },
      {
        path: "/bookshelf",
        element: <Bookshelf />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path:"/about",
        element:<About />
      },
      // {
      //   path:"/login",
      //   element: <Login />
      // },
      {
        path:"/logout",
        element:<Logout />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
