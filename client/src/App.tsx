import { Box } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/common";
import { routes } from "./routes";
import PrivateRoute from "./components/Private";
import ErrorModal from "./components/modals/ErrorModal";

// const protectedRoutes = [
//   "/dashboard/users",
//   "/dashboard/inventory",
//   "/dashboard/sales",
//   "/dashboard/stock",
//   "/dashboard/reports",
//   "/dashboard",
//   "/report/:id",
//   "/me",
// ];

// const isProtected = (e: string) => {
//   return protectedRoutes.includes(e);
// };

function App() {
  return (
    <Box
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Switch>
        {routes.map(({ auth, ...props }, idx) =>
          auth ? (
            <PrivateRoute key={idx} {...props} />
          ) : (
            <Route key={idx} {...props} />
          ),
        )}
      </Switch>
      <ErrorModal />
    </Box>
  );
}

export default App;
