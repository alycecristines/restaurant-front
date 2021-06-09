import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/theme/header';
import Content from '../../components/theme/content';

const Grid = lazy(() => import('./components/grid'));

const Orders = () => {
  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }>
      <Header title="Pedidos">
        <Link to="/corders" className="btn btn-primary btn-sm">
          <i className="fa fa-plus mr-1"></i>
          Imprimir Pedidos do Dia
        </Link>
      </Header>
      <Content>
        <Grid title="Pedidos" />
      </Content>
    </Suspense>
  );
};

export default Orders;
