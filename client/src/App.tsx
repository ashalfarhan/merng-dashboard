import { Box } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { routes } from "./routes";
import PrivateRoute from "./views/Private";

const adminRoutes = ["/dashboard/users", "/dashboard/reports", "/dashboard"];

function App() {
  const isProtected = (e: string) => {
    return adminRoutes.includes(e);
  };
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
    </Box>
  );
}

export default App;
