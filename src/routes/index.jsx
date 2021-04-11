import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login';
import ResetPassword from '../pages/reset-password';
import ValidateCode from '../pages/validate-code';
import NewPassword from '../pages/new-password';
import FirstAccess from '../pages/first-access';
import Dashboard from '../pages/dashboard';
import Companies from '../pages/registrations/companies';
import CompaniesAdd from '../pages/registrations/companies/components/add';
import CompaniesEdit from '../pages/registrations/companies/components/edit';

const PrivateRouter = ({ component: Component, ...rest }) => {
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
    <PrivateRouter exact path="/" component={Dashboard} />
    <PrivateRouter exact path="/companies" component={Companies} />
    <PrivateRouter exact path="/companies/add" component={CompaniesAdd} />
    <PrivateRouter exact path="/companies/edit/:id" component={CompaniesEdit} />
  </Switch>
);

export default Routes;
