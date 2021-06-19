/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDepartment, getAllDepartments } from '../../../../actions/departmentsActions';

const DepartmentGrid = props => {
  const { departmentRecords, departmentIsLoading } = useSelector(state => state.departments);
  const dispatch = useDispatch();

  const departmentColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '25%',
    },
    {
      title: 'Nome',
      dataIndex: 'description',
    },
    {
      title: 'Ativo?',
      dataIndex: 'inactivated',
      render: text => (text ? <Tag color="red">Não</Tag> : <Tag color="green">Sim</Tag>),
    },
  ];

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getAllDepartments());
    }
  }, []);

  return (
    <div className="panel panel-default">
      <div className="panel-body no-padding">
        <Table
          loading={departmentIsLoading}
          rowKey="id"
          dataSource={departmentRecords}
          columns={departmentColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(DepartmentGrid);
