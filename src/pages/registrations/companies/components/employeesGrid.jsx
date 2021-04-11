/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
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
      title: 'Departamento',
      dataIndex: 'departmentId',
    },
    {
      title: 'Ação',
      dataIndex: 'acao',
      width: '14%',
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            <Tooltip title="Excluir">
              <button
                type="button"
                onClick={() => dispatch(deleteEmployee(record.id))}
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
    if (props.match.params.id) {
      dispatch(getAllEmployees());
    }
  }, []);

  return (
    <div className="panel panel-default">
      <div className="panel-body no-padding">
        <Table
          loading={employeeIsLoading}
          // TODO: Add pagination
          rowKey="id"
          dataSource={employeeRecords}
          columns={employeeColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(EmployeeGrid);
