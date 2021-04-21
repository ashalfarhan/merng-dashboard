import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { routes } from "./routes";
import PrivateRoute from "./components/Private";
import { useDispatch, useSelector } from "./store";
import { closeError, getError } from "./store/slices/error";
import { CgDanger } from "react-icons/cg";
const protectedRoutes = [
  "/dashboard/users",
  "/dashboard/inventory",
  "/dashboard/sales",
  "/dashboard/stock",
  "/dashboard/reports",
  "/dashboard",
];
const isProtected = (e: string) => {
  return protectedRoutes.includes(e);
};
function App() {
  const { isError, message } = useSelector(getError);
  const dispatch = useDispatch();
  const handleShutError = () => {
    dispatch(closeError());
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
      <Modal onClose={handleShutError} isOpen={isError} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <CgDanger />
            <Text ml="2" color="red.600">
              {"Oops"}
            </Text>
          </ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button w="full" variant="outline" onClick={handleShutError}>
              {"Ok"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
