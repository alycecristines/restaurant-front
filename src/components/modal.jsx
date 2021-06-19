import React, { useRef } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import Resume from './printFile';

const ModalImpressao = ({ isVisible, closeModal, order, oneItem }) => {
  const modalRef = useRef();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      title="Lista de Pedidos"
      visible={isVisible}
      onCancel={closeModal}
      width={'70%'}
      footer={[]}>
      <div ref={modalRef} style={{ maxWidth: '100%' }} className="text-center">
        <button
          type="button"
          className="bg-gray-500 border border-gray-500 p-2 mb-4"
          onClick={() => handlePrint()}>
          {' '}
          Imprimir{' '}
        </button>
        <Resume ref={componentRef} order={[order]} printOneItem={oneItem ? oneItem : false} />
      </div>
    </Modal>
  );
};

ModalImpressao.defaultProps = {
  isVisible: false,
  closeModal: null,
};

ModalImpressao.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  order: PropTypes.object,
  oneItem: PropTypes.bool,
};

export default ModalImpressao;
