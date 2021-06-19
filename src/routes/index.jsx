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
import Products from '../pages/registrations/products';
import ProductsAdd from '../pages/registrations/products/components/add';
import ProductsEdit from '../pages/registrations/products/components/edit';
import Orders from '../pages/orders';
import OrdersRequests from '../pages/orders-request';
import NaoAutorizado from '../pages/naoautorizado';

const PrivateRouter = ({ component: Component, tipo, ...rest }) => {
  const verificador = tipo.filter(item => {
    if (item === localStorage.getItem('@rest:tipo')) return true;
  });

  return (
    <Route
      {...rest}
      render={props =>
        !!localStorage.getItem('@rest:token') ? (
          verificador.length === 1 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                exact: true,
                pathname: '/nao-autorizado',
                state: { from: props.location },
              }}
            />
          )
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
    <Route exact path="/login" component={Login} tipo={['Administrator', 'Employee']} />
    <Route
      exact
      path="/reset-password"
      component={ResetPassword}
      tipo={['Administrator', 'Employee']}
    />
    <Route
      exact
      path="/nao-autorizado"
      component={NaoAutorizado}
      tipo={['Administrator', 'Employee']}
    />

    <Route
      exact
      path="/validate-code"
      component={ValidateCode}
      tipo={['Administrator', 'Employee']}
    />
    <Route
      exact
      path="/new-password"
      component={NewPassword}
      tipo={['Administrator', 'Employee']}
    />
    <Route
      exact
      path="/first-access"
      component={FirstAccess}
      tipo={['Administrator', 'Employee']}
    />
    <PrivateRouter exact path="/companies" component={Companies} tipo={['Administrator']} />
    <PrivateRouter exact path="/companies/add" component={CompaniesAdd} tipo={['Administrator']} />
    <PrivateRouter
      exact
      path="/companies/edit/:id"
      component={CompaniesEdit}
      tipo={['Administrator']}
    />
    <PrivateRouter exact path="/products" component={Products} tipo={['Administrator']} />
    <PrivateRouter exact path="/products/add" component={ProductsAdd} tipo={['Administrator']} />
    <PrivateRouter
      exact
      path="/products/edit/:id"
      component={ProductsEdit}
      tipo={['Administrator']}
    />
    <PrivateRouter exact path="/orders" component={Orders} tipo={['Administrator']} />
    <PrivateRouter exact path="/" component={Orders} tipo={['Administrator']} />
    <PrivateRouter exact path="/order-request" component={OrdersRequests} tipo={['Employee']} />
  </Switch>
);

export default Routes;
