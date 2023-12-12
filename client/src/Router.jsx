import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

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
  }
]);


export default router