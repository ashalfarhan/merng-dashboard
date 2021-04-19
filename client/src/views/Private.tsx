import React from "react";
import { Redirect, Route } from "react-router";
import auth from "../helpers/auth";
interface Props {
  rest?: any[];
  component: (props: any) => JSX.Element;
}
export default function PrivateRoute({ component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn ? (
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
