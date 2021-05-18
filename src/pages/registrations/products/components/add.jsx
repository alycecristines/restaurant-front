import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AddForm from './addForm';
import Header from '../../../../components/theme/header';

const Add = () => (
  <Fragment>
    <Header title="Adicionar Produto">
      <Link to="/products" className="btn btn-warning btn-sm">
        <i className="fa fa-long-arrow-left mr-1"></i>
        Voltar
      </Link>
    </Header>
    <div className="wrapper wrapper-content">
      <div className="row">
        <div className="col-md-12">
          <AddForm />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Add;
