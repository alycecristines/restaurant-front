import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import Form from './form';
import Header from '../../../../components/theme/header';

const Edit = () => (
  <Fragment>
    <Header title="Editar Produto">
      <Link to="/products" className="btn btn-warning btn-sm">
        <i className="fa fa-long-arrow-left mr-1"></i>
        Voltar
      </Link>
    </Header>
    <div className="wrapper wrapper-content">
      <div className="row">
        <div className="col-md-12">
          {/* <Form /> */}
        </div>
      </div>
    </div>
  </Fragment>
);

export default Edit;
