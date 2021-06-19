/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import history from '../../../../helpers/history';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, productsSetSearch } from '../../../../actions/productsActions';
import { variationsSetSearch } from '../../../../actions/variationsActions';

const GridProducts = ({ title }) => {
  const dispatch = useDispatch();
  const { productIsLoading, productRecords } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const productsColumns = [
    {
      title: 'Descriçao',
      dataIndex: 'description',
      width: '45%',
    },
    {
      title: 'Ação',
      dataIndex: 'acao',
      width: '15%',
      align: 'center',
      render: (text, record) => {
        return (
          <Tooltip title="Editar">
            <button
              onClick={() => {
                dispatch([
                  productsSetSearch({ description: '', menuId: '' }),
                  variationsSetSearch({ description: '', productId: record.id }),
                ]);
                history.push(`/products/edit/${record.id}`);
              }}
              className="btn-icon-edit mr-1">
              <i className="fa fa-pencil" />
            </button>
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
          loading={productIsLoading}
          rowKey="id"
          dataSource={productRecords}
          columns={productsColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(GridProducts);
