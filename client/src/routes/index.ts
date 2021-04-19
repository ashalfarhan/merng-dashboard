import AllReports from "../views/AllReports";
import Page404 from "../views/404Page";
import HomePage from "../views/Home";
import LoginPage from "../views/Login";
import AllUsers from "../views/AllUsers";
import Overview from "../views/Overview";

export const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/dashboard",
    component: Overview,
    exact: true,
  },
  {
    path: "/dashboard/reports",
    component: AllReports,
    exact: true,
  },
  {
    path: "/dashboard/users",
    component: AllUsers,
    exact: true,
  },
  {
    path: "*",
    component: Page404,
    exact: true,
  },
];
