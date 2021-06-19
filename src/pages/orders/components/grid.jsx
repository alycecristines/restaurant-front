/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ModalImpressao from '../../../components/modal';
import { getAllOrders } from '../../../actions/ordersActions';

const GridOrders = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { ordersIsLoading, ordersRecords } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch([getAllOrders()]);
  }, []);

  const ordersColumns = [
    {
      title: 'Empresa',
      dataIndex: 'companyName',
    },
    {
      title: 'Colaborador',
      dataIndex: 'employeeName',
    },
    {
      title: 'Departamento',
      dataIndex: 'departmentDescription',
    },
    {
      title: 'Impresso?',
      dataIndex: 'printed',
      render: text => (!text ? <Tag color="red">Não</Tag> : <Tag color="green">Sim</Tag>),
    },
    {
      title: 'Ação',
      dataIndex: 'acao',
      width: '15%',
      align: 'center',
      render: (_text, record) => {
        return (
          <Tooltip title="Imprimir">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="btn-icon-edit mr-1">
              <i className="fa fa-print mr-1"></i>
            </button>
            {showModal && (
              <ModalImpressao
                isVisible={showModal}
                closeModal={() => {
                  setShowModal(false);
                }}
                order={record}
              />
            )}
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">{title}</div>
      <div className="panel-body no-padding">
        <Table
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
