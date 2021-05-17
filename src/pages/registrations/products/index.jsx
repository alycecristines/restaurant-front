import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../../components/theme/header';
import Content from '../../../components/theme/content';

const Grid = lazy(() => import('./components/grid'));

const Products = () => {
  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }>
      <Header title="Produtos">
        <Link to="/products/add" className="btn btn-primary btn-sm">
          <i className="fa fa-plus mr-1"></i>
          Adicionar
        </Link>
      </Header>
      <Content>
        <Grid title="Produtos" />
      </Content>
    </Suspense>
  );
};

export default Products;
