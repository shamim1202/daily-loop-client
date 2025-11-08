import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/HomeLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add_habit",
        element: <h1>Add habit route</h1>,
      },
      {
        path: "my_habits",
        element: <h1>All my habit route</h1>,
      },
      {
        path: "public_habits",
        element: <h1>Browse all public habits</h1>,
      },
      {
        path: "habit_details/:id",
        element: <h1>Habit details page</h1>,
      },
    ],
  },

  {
    path: "/auth",
    element: <h1>Authlayout</h1>,
    children: [
      {
        path: "login",
        element: <h1>Login page</h1>,
      },
      {
        path: "register",
        element: <h1>Register page</h1>,
      },
      {
        path: "forgot_password",
        element: <h1>Forgor password page</h1>,
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage
  },
]);

export default router;
