import AllReports from "../views/AllReports";
import Page404 from "../views/404Page";
import HomePage from "../views/Home";
import LoginPage from "../views/Login";
import AllUsers from "../views/AllUsers";
import Overview from "../views/Overview";
import Inventory from "../views/Inventory";
import Sales from "../views/Sales";
import Stock from "../views/Stock";
import MePage from "../views/Me";
import ReportPage from "../views/Report";

export const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/me",
    component: MePage,
    exact: true,
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/report/:id",
    component: ReportPage,
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
    path: "/dashboard/inventory",
    component: Inventory,
    exact: true,
  },
  {
    path: "/dashboard/sales",
    component: Sales,
    exact: true,
  },
  {
    path: "/dashboard/stock",
    component: Stock,
    exact: true,
  },
  {
    path: "*",
    component: Page404,
    exact: true,
  },
];
