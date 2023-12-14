import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import AboutUsPage from "./views/AboutUsPage";
import CatsPage from "./views/CatsPage";


const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/about-us",
    element: <AboutUsPage />
  },
  {
    path: "/cats",
    element: <CatsPage />
  }
]);


export default router