import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalContext } from "../store/context";

const DynamicRoute = (props) => {
  const ctx = useGlobalContext();

  if (props.authenticated && !ctx.data.token) {
    return <Redirect to="/sign-in" />;
  } else if (props.guest && ctx.data.token) {
    return <Redirect to="/" />;
  } else {
    return <Route component={props.children} {...props} />;
  }
};

export default DynamicRoute;
