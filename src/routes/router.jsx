import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import RootLayout from "../layout/HomeLayout";
import AddHabit from "../pages/AddHabit/AddHabit";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

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
        path: "public_habits",
        element: <h1>Public Habits</h1>,
      },
      {
        path: "my_habits",
        element: <h1>My Habits</h1>,
      },
      {
        path: "add_habit",
        element: <AddHabit></AddHabit>,
      },
      {
        path: "habit_details/:id",
        element: <h1>Habit details page</h1>,
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "forgot_password",
        element: <h1>Forgor password page</h1>,
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);

export default router;
