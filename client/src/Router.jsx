import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import AboutUsPage from "./views/AboutUsPage";
import CatsPage from "./views/CatsPage";
import FavCats from "./views/FavCats";


const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
    loader: () => {
      let token = localStorage.getItem("access_token");
      if (token) {
        throw redirect("/home");
      } else {
        return null;
      }
    },
  },
  {
    path: "/about-us",
    element: <AboutUsPage />,
  },
  {
    path: "/cats",
    element: <CatsPage />,
    loader: () => {
      let token = localStorage.getItem("access_token");
      if (!token) {
        throw redirect("/");
      } else {
        return null;
      }
    }
  },
  {
    path: "/fav-cats",
    element: <FavCats />
  }
]);

export default router;