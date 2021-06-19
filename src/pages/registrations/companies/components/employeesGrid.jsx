/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getAllEmployees } from '../../../../actions/employeesActions';

const EmployeeGrid = props => {
  const { employeeRecords, employeeIsLoading } = useSelector(state => state.employees);
  const dispatch = useDispatch();

  const employeeColumns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Departamento',
      dataIndex: 'departmentId',
    },
    {
      title: 'Ativo?',
      dataIndex: 'inactivated',
      render: text => (text ? <Tag color="red">Não</Tag> : <Tag color="green">Sim</Tag>),
    },
  ];

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getAllEmployees());
    }
  }, []);

  return (
    <div className="panel panel-default">
      <div className="panel-body no-padding">
        <Table
          loading={employeeIsLoading}
          rowKey="id"
          dataSource={employeeRecords}
          columns={employeeColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(EmployeeGrid);
