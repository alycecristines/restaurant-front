/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import VMasker from 'vanilla-masker';
import history from '../../../../helpers/history';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany, getAllCompanies } from '../../../../actions/companiesActions';
import { departmentsSetSearch } from '../../../../actions/departmentsActions';
import { employeesSetSearch } from '../../../../actions/employeesActions';

const GridCompanies = ({ title }) => {
  const dispatch = useDispatch();
  const { companiesIsLoading, companiesRecords } = useSelector(state => state.companies);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, []);

  const perfilColumns = [
    {
      title: 'Razão Social',
      dataIndex: 'corporateName',
      width: '45%',
    },
    {
      title: 'CNPJ',
      dataIndex: 'registrationNumber',
      width: '30%',
      render: text => {
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
                onClick={() => {
                  dispatch([
                    departmentsSetSearch({ description: '', companyId: record.id }),
                    employeesSetSearch({
                      name: '',
                      email: '',
                      departmentId: '',
                      companyId: record.id,
                    }),
                  ]);
                  history.push(`/companies/edit/${record.id}`);
                }}
                className="btn-icon-edit mr-1">
                <i className="fa fa-pencil" />
              </button>
            </Tooltip>
            <Tooltip title="Excluir">
              <button
                onClick={() => dispatch(deleteCompany(record.id))}
                className="btn-icon-delete">
                <i className="fa fa-close"></i>
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // function onChangePage(page, pageSize) {
  //   dispatch(getAllCompanies(page-1, pageSize));
  // }

  // function onShowSizeChange(current, size) {
  //   dispatch(getAllCompanies(0, size));
  // }

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
          loading={companiesIsLoading}
          rowKey="id"
          dataSource={companiesRecords}
          columns={perfilColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(GridCompanies);
