import { Redirect, Route } from "react-router-dom";
import { useSelector } from "../store";
import { isAuth } from "../store/slices/auth";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const isLoggedIn = useSelector(isAuth);
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
