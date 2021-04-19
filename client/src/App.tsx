import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { routes } from "./routes";
import PrivateRoute from "./views/Private";
const adminRoutes = ["/admin", "/users"];

function App() {
  return (
    <Box
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        style={{
          minHeight: "90vh",
        }}
        px="4"
      >
        <Grid templateColumns="repeat(4, 1fr)" rows={1} columnGap="4">
          <GridItem>
            <SideBar />
          </GridItem>
          <GridItem colSpan={3}>
            <Switch>
              {routes.map((route, idx) => {
                adminRoutes.includes(route.path) ? (
                  <PrivateRoute key={idx} {...route} />
                ) : (
                  <Route key={idx} {...route} />
                );
              })}
            </Switch>
            {/* <AllReports />
            <AllUsers />
            <Box>
              <Heading>This is not All Report</Heading>
            </Box> */}
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
