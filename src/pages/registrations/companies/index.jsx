import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../../components/theme/header';
import Content from '../../../components/theme/content';

const Grid = lazy(() => import('./components/grid'));

const Companies = () => {
  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }>
      <Header title="Empresas">
        <Link to="/companies/add" className="btn btn-primary btn-sm">
          <i className="fa fa-plus mr-1"></i>
          Adicionar
        </Link>
      </Header>
      <Content>
        <Grid title="Empresas" />
      </Content>
    </Suspense>
  );
};

export default Companies;
