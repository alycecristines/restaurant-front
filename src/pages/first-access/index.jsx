import React from 'react';
import { Column, Row } from '../../components/bootstrap';
import logo from '../../images/logo.png';
import Form from './form';

const FirstAccess = () => {
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
                <div
                  className="mb-2"
                  style={{
                    display: 'flex',
                    marginTop: 20,
                    paddingBottom: 30,
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}>
                  <center style={{ width: '75%' }}>
                    Insira abaixo seu e-mail para prosseguirmos para definição de senha.
                  </center>
                </div>
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

export default FirstAccess;
