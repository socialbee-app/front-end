import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { useSelector } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
