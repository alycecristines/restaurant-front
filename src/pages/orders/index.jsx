import React, { lazy, Suspense, useState } from 'react';
import Header from '../../components/theme/header';
import Content from '../../components/theme/content';
import { Tooltip } from 'antd';
import ModalImpressao from '../../components/modal';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { getAllOrdersNotPrintedAndSetPrinted } from '../../actions/ordersActions';
const Grid = lazy(() => import('./components/grid'));

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { ordersRecordsNotPrinted } = useSelector(state => state.orders);

  function handleFetchOrderNotPrinted() {
    dispatch([getAllOrdersNotPrintedAndSetPrinted()]);
    setShowModal(true);
  }

  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }>
      <Header title="Pedidos">
        <Tooltip title="Imprimir">
          <button
            onClick={() => {
              handleFetchOrderNotPrinted();
            }}
            className="btn btn-primary btn-sm">
            <i className="fa fa-print mr-1"></i>
            Imprimir Pedidos do Dia
          </button>
        </Tooltip>
      </Header>
      <Content>
        <Grid title="Pedidos" />
      </Content>

      {showModal && (
        <ModalImpressao
          isVisible={showModal}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </Suspense>
  );
};

export default Orders;
