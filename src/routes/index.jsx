import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login';
import ResetPassword from '../pages/reset-password';
import ValidateCode from '../pages/validate-code';
import NewPassword from '../pages/new-password';
import FirstAccess from '../pages/first-access';
import Dashboard from '../pages/dashboard';

const PrivateRouter = ({ component: Component, tipo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
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
    <Route exact path="/reset-password" component={ResetPassword} />
    <Route exact path="/validate-code" component={ValidateCode} />
    <Route exact path="/new-password" component={NewPassword} />
    <Route exact path="/first-access" component={FirstAccess} />
    <Route exact path="/" component={Dashboard} />
  </Switch>
);

export default Routes;
