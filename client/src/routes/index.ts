import { Spinner } from "@chakra-ui/react";
import Loadable from "react-loadable";

const AllReports = Loadable({
  loader: () => import("../views/AllReports"),
  loading: Spinner,
});
const Page404 = Loadable({
  loader: () => import("../views/404Page"),
  loading: Spinner,
});
const HomePage = Loadable({
  loader: () => import("../views/Home"),
  loading: Spinner,
});
const LoginPage = Loadable({
  loader: () => import("../views/Login"),
  loading: Spinner,
});
const AllUsers = Loadable({
  loader: () => import("../views/AllUsers"),
  loading: Spinner,
});
const Overview = Loadable({
  loader: () => import("../views/Overview"),
  loading: Spinner,
});
const Inventory = Loadable({
  loader: () => import("../views/Inventory"),
  loading: Spinner,
});
const Sales = Loadable({
  loader: () => import("../views/Sales"),
  loading: Spinner,
});
const Stock = Loadable({
  loader: () => import("../views/Stock"),
  loading: Spinner,
});
const MePage = Loadable({
  loader: () => import("../views/Me"),
  loading: Spinner,
});
const ReportPage = Loadable({
  loader: () => import("../views/Report"),
  loading: Spinner,
});

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
    auth: true

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
    auth: true
  },
  {
    path: "/dashboard",
    component: Overview,
    exact: true,
    auth: true
  },
  {
    path: "/dashboard/reports",
    component: AllReports,
    exact: true,
    auth: true
  },
  {
    path: "/dashboard/users",
    component: AllUsers,
    exact: true,
    auth: true
  },
  {
    path: "/dashboard/inventory",
    component: Inventory,
    exact: true,
    auth: true
  },
  {
    path: "/dashboard/sales",
    component: Sales,
    exact: true,
    auth: true
  },
  {
    path: "/dashboard/stock",
    component: Stock,
    exact: true,
    auth: true
  },
  {
    path: "*",
    component: Page404,
  },
];
