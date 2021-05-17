/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVariation, getAllVariations } from '../../../../actions/variationsActions';

const VariationsGrid = props => {
  const { variationsRecords, variationsIsLoading } = useSelector(state => state.variations);
  const dispatch = useDispatch();

  const variationsColumns = [
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
                type="button"
                onClick={() => dispatch(deleteVariation(record.id))}
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
      dispatch(getAllVariations(props.match.params.id));
    }
  }, []);

  return (
    <div className="panel panel-default">
      <div className="panel-body no-padding">
        <Table
          loading={variationsIsLoading}
          // TODO: Add pagination
          rowKey="id"
          dataSource={variationsRecords}
          columns={variationsColumns}
        />
      </div>
    </div>
  );
};

export default withRouter(VariationsGrid);
