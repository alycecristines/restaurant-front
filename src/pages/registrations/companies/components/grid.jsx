/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import VMasker from 'vanilla-masker';
import history from '../../../../helpers/history';

const GridCompanies = ({ title }) => {
  const perfilColumns = [
    {
      title: 'Código',
      dataIndex: 'id',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Razão Social',
      dataIndex: 'corporateName',
      width: '45%',
    },
    {
      title: 'CNPJ',
      dataIndex: 'registrationNumber',
      width: '30%',
      render: (text, record) => {
        return VMasker.toPattern(text, '99.999.999/9999-99');
      },
    },
    {
      title: 'Ação',
      dataIndex: 'acao',
      width: '15%',
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            <Tooltip title="Editar">
              <button
                onClick={() => history.push(`/companies/edit/${record.id}`)}
                className="btn-icon-edit mr-1">
                <i className="fa fa-pencil" />
              </button>
            </Tooltip>
            <Tooltip title="Excluir">
              <button
                // onClick={() => deleteCompany(record.id)} TODO: Adicionar chamada pra deletar
                className="btn-icon-delete">
                <i className="fa fa-close"></i>
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    // TODO: Acionar o get all companies getAll(0, 10);
  }, []);

  function onChangePage(page, pageSize) {
    // TODO: adicionar o getAll(page - 1, pageSize);
  }

  function onShowSizeChange(current, size) {
    // TODO: adicionar o getAll(0, size);
  }

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">{title}</div>
      <div className="panel-body no-padding">
        <Table
          // pagination={{
          //   pageSizeOptions: ['10', '30', '50'],
          //   showSizeChanger: true,
          //   onShowSizeChange: onShowSizeChange,
          //   onChange: onChangePage,
          //   defaultCurrent: // TODO: adicionar o currentPage do reducer,
          //   total: // TODO: adicionar o totalRecords do reducer,
          // }}
          // loading={this.props.perfilActions.loading}
          rowKey="id"
          // dataSource={this.props.perfilReducer.records}
          columns={perfilColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(GridCompanies);
