import React from 'react';
import { Center, Column, Row } from '../../components/bootstrap';
import logo from '../../images/logo.png';
import Form from './form';

const ResetPassword = () => {
  return (
    <Row>
      <Column col="4" />
      <Column col="4">
        <div style={{ marginTop: 100 }}>
          <Row>
            <Column col="12">
              <div className=" ibox-content" style={{ border: '1px solid #eee' }}>
                <center>
                  <img className=" mb-3" style={{ width: '10%' }} src={logo} alt="logo" />
                </center>
                <h3 className="heading-title mb-2" style={{ fontSize: '18px' }}>
                  <Center>Recuperação de Senha</Center>
                </h3>
                <Form />
              </div>
            </Column>
            <Column col="3" />
          </Row>
        </div>
      </Column>
      <Column col="4" />
    </Row>
  );
};

export default ResetPassword;
