import AllReports from "../components/Menus/AllReports";
import Page404 from "../views/404Page";
import HomePage from "../views/Home";
import LoginPage from "../views/Login";
import AllUsers from "../components/Menus/AllUsers";
// import MemberPage from "../views/MemberPage";
// import AdminPage from "../views/AdminPage";

export const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/reports",
    component: AllReports,
    exact: true,
  },
  {
    path: "/users",
    component: AllUsers,
    exact: true,
  },
  // {
  //   path: "/dashboard",
  //   component: MemberPage,
  //   exact: true,
  // },
  // {
  //   path: "/dashboard/admin",
  //   component: AdminPage,
  //   exact: true,
  // },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "*",
    component: Page404,
    exact: true,
  },
];
