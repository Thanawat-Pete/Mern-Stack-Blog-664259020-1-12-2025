import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout.jsx"
import Home from "../pages/Home.jsx"
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ArticlePage from "../pages/ArticlePage.jsx";
import Create from "../pages/Create.jsx";
import Edit from "../pages/Edit.jsx";
import AriticleByAuthor from "../pages/AriticleByAuthor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/article/:id",
        element: <ArticlePage />
      },
      {
        path: "/create",
        element: <Create />
      },
      {
        path: "/article/edit/:id",
        element: <Edit />
      },
      {
        path: "/article/author/:author",
        element: <AriticleByAuthor />
      }
    ],
  },
]);

export default router;