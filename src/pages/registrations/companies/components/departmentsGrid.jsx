/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
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
    },
    {
      title: 'Nome',
      dataIndex: 'description',
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
                onClick={() => dispatch(deleteDepartment(record.id))}
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
      dispatch(getAllDepartments());
    }
  }, []);

  return (
    <div className="panel panel-default">
      <div className="panel-body no-padding">
        <Table
          loading={departmentIsLoading}
          // TODO: Add pagination
          rowKey="id"
          dataSource={departmentRecords}
          columns={departmentColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(DepartmentGrid);
