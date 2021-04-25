import { Box } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { routes } from "./routes";
import PrivateRoute from "./components/Private";
import ErrorModal from "./components/ErrorModal";

const protectedRoutes = [
  "/dashboard/users",
  "/dashboard/inventory",
  "/dashboard/sales",
  "/dashboard/stock",
  "/dashboard/reports",
  "/dashboard",
  "/report/:id",
  "/me",
];

const isProtected = (e: string) => {
  return protectedRoutes.includes(e);
};

function App() {
  return (
    <Box
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Switch>
        {routes.map((route, idx) =>
          isProtected(route.path) ? (
            <PrivateRoute key={idx} {...route} />
          ) : (
            <Route key={idx} {...route} />
          )
        )}
      </Switch>
      <ErrorModal />
    </Box>
  );
}

export default App;
