import React from "react";

// import "./App.css";

import HomePage from "./Home/HomePage";
import AppToDo from "./Home/AppToDo";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

// import DetailPizzaPage from './pages/DetailPagePizza';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // children: appRouters,
  },
  {
    path: "/app-todo",
    element: <AppToDo />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
