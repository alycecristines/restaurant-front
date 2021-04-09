/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';

const EmployeeGrid = () => {
  const employeeColumns = [
    {
      title: 'id',
      dataIndex: 'Id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Departamento',
      dataIndex: 'name',
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
                // onClick={() => this.props.colaboradorAtendimentoActions.delete(record.id)}
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
    // if (this.props.match.params.id) {
    //   this.props.colaboradorAtendimentoActions.getByColaboradorId( TODO
    //     this.props.colaboradorReducer.colaboradorDetails.id,
    //   );
    // }
  }, []);

  return (
    <div className="panel panel-default">
      <div className="panel-body no-padding">
        <Table
          // loading={this.props.colaboradorAtendimentoReducer.loading} TODO
          // TODO: Add pagination
          rowKey="id"
          // dataSource={this.props.colaboradorAtendimentoReducer.records} TODO
          columns={employeeColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(EmployeeGrid);
