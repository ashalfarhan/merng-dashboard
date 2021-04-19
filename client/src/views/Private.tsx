import { Redirect, Route } from "react-router-dom";
import auth from "../helpers/auth";

export default function PrivateRoute({ component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLoggedIn ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
