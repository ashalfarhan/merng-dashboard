import { Box } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/common";
import { routes } from "./routes";
import PrivateRoute from "./components/Private";
import ErrorModal from "./components/modals/ErrorModal";

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
