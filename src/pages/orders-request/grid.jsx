/* eslint-disable react/display-name */
import React from 'react';
import { Table } from 'antd';

const GridItems = ({ title, items }) => {
  const productsColumns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Produto',
      dataIndex: 'productName',
    },
    {
      title: 'Variaçao',
      dataIndex: 'variationName',
    },
  ];

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">{title}</div>
      <div className="panel-body no-padding">
        <Table rowKey="id" dataSource={items} columns={productsColumns} loading={false} />
      </div>
    </div>
  );
};

export default GridItems;
