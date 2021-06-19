/* eslint-disable react/display-name */
import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Resume = React.forwardRef((props, ref) => {
  const { ordersRecordsNotPrinted, ordersIsLoading } = useSelector(state => state.orders);

  if (ordersIsLoading) return <Spin />;

  if (props.order?.length && props.oneItem) {
    return (
      <div style={{ width: '90%' }} ref={ref}>
        {props.order.map((order, index) => {
          return (
            <div key={index}>
              <hr style={{ marginLeft: '5%' }} />
              <div style={{ marginLeft: '10%' }}>
                <div style={{ textAlign: 'start' }}>
                  <p>Nome do Colaborador: {order?.employeeName}</p>
                  <p>Departamento: {order?.departmentDescription}</p>
                  <p>Data: {order?.createdAt}</p>
                  <p>Itens do pedido</p>
                </div>
                <table
                  style={{ borderCollapse: 'collapse', width: '70%', height: '36px' }}
                  border="1">
                  <tbody>
                    <tr style={{ height: '18px' }}>
                      <td style={{ width: '50%', height: '18px' }}>
                        <strong>Produto</strong>
                      </td>
                      <td style={{ width: '50%', height: '18px' }}>
                        <strong>Varia&ccedil;&atilde;o</strong>
                      </td>
                    </tr>
                    {order?.items.map((orderItem, index) => {
                      return (
                        <tr key={index} style={{ height: '18px' }}>
                          <td style={{ width: '50%', height: '18px' }}>
                            {orderItem?.product?.description}
                          </td>
                          <td style={{ width: '50%', height: '18px' }}>
                            {orderItem?.variation?.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <hr style={{ marginLeft: '5%' }} />
            </div>
          );
        })}
      </div>
    );
  }

  if (ordersRecordsNotPrinted.length) {
    return (
      <div style={{ width: '90%' }} ref={ref}>
        {ordersRecordsNotPrinted.map((orderNotPrinted, index) => {
          return (
            <div key={index}>
              <hr style={{ marginLeft: '5%' }} />
              <div style={{ marginLeft: '10%' }}>
                <div style={{ textAlign: 'start' }}>
                  <p>Nome do Colaborador: {orderNotPrinted?.employeeName}</p>
                  <p>Departamento: {orderNotPrinted?.departmentDescription}</p>
                  <p>Data: {orderNotPrinted?.createdAt}</p>
                  <p>Itens do pedido</p>
                </div>
                <table
                  style={{ borderCollapse: 'collapse', width: '70%', height: '36px' }}
                  border="1">
                  <tbody>
                    <tr style={{ height: '18px' }}>
                      <td style={{ width: '50%', height: '18px' }}>
                        <strong>Produto</strong>
                      </td>
                      <td style={{ width: '50%', height: '18px' }}>
                        <strong>Varia&ccedil;&atilde;o</strong>
                      </td>
                    </tr>
                    {orderNotPrinted?.items.map((orderItemNotPrinted, index) => {
                      return (
                        <tr key={index} style={{ height: '18px' }}>
                          <td style={{ width: '50%', height: '18px' }}>
                            {orderItemNotPrinted?.product?.description}
                          </td>
                          <td style={{ width: '50%', height: '18px' }}>
                            {orderItemNotPrinted?.variation?.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <hr style={{ marginLeft: '5%' }} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ width: '90%' }} ref={ref}>
      <h3>Não existem pedidos que não foram impressos.</h3>
    </div>
  );
});

export default Resume;
