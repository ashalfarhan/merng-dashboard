import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../store";
import { isAuth } from "../store/slices/auth";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const isLoggedIn = useAppSelector(isAuth);
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
