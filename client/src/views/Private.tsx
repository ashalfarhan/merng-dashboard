import { Redirect, Route } from "react-router-dom";
import useAuth from "../helpers/auth";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
