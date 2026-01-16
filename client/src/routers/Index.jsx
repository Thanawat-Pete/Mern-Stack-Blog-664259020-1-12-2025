import { createBrowserRouter } from "react-router";
import UserPage from "../pages/UserPage.jsx";

import MainLayout from "../layouts/MainLayout.jsx"
import Home from "../pages/Home.jsx"
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ArticlePage from "../pages/ArticlePage.jsx";
import Create from "../pages/Create.jsx";
import Edit from "../pages/Edit.jsx";
import AriticleByAuthor from "../pages/AriticleByAuthor.jsx";
import NotAllowed from "../pages/NotAllowed.jsx";
import NotFound from "../pages/NotFound.jsx";

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
        element:  <UserPage> <Login /> </UserPage> 
      },
      {
        path: "/register",
        element: <UserPage> <Register /> </UserPage> 
      },
      {
        path: "/article/:id",
        element: <ArticlePage />
      },
      {
        path: "/create-article",
        element: <Create />
      },
      {
        path: "/article/edit/:id",
        element: <Edit /> 
      },
      {
        path: "/article/author/:author",
        element: <AriticleByAuthor />
      },
      {
        path: "/notallowed",
        element: <NotAllowed />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);

export default router;