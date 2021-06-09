/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import VMasker from 'vanilla-masker';
import { getAllOrders, getAllOrdersNotPrintedAndSetPrinted } from '../../../actions/ordersActions';
// import history from '../../../helpers/history';

const GridOrders = ({ title }) => {
  const dispatch = useDispatch();
  const { ordersIsLoading, ordersRecords } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const ordersColumns = [
    {
      title: 'Empresa',
      dataIndex: 'corporateName',
    },
    {
      title: 'Colaborador',
      dataIndex: 'corporateName',
    },
    {
      title: 'Data',
      dataIndex: 'corporateName',
    },
    {
      title: 'Impresso?',
      dataIndex: 'corporateName',
    },
    // {
    //   title: 'CNPJ',
    //   dataIndex: 'registrationNumber',
    //   width: '30%',
    //   render: text => {
    //     return VMasker.toPattern(text, '99.999.999/9999-99');
    //   },
    // },
    {
      title: 'Ação',
      dataIndex: 'acao',
      width: '15%',
      align: 'center',
      render: (_text, _record) => {
        return (
          <Tooltip title="Imprimir">
            <button
              onClick={() => {
                dispatch(getAllOrdersNotPrintedAndSetPrinted());
              }}
              className="btn-icon-edit mr-1">
              {/* TODO: adicionar nesse clique a opcao para imprimir o item  */}
              <i className="fa fa-pencil" />
            </button>
          </Tooltip>
        );
      },
    },
  ];

  // function onChangePage(page, pageSize) {
  //   dispatch(getAllOrders(page-1, pageSize));
  // }

  // function onShowSizeChange(current, size) {
  //   dispatch(getAllOrders(0, size));
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
          loading={ordersIsLoading}
          rowKey="id"
          dataSource={ordersRecords}
          columns={ordersColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(GridOrders);
