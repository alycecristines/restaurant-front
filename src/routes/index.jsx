import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';

const PrivateRouter = ({ component: Component, tipo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!localStorage.getItem('@rest:token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              exact: true,
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRouter exact path="/" component={Dashboard} />
  </Switch>
);

export default Routes;
