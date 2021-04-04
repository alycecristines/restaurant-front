import React from 'react';
import { Center, Column, Row } from '../../components/bootstrap';
import Form from './form';
import logo from '../../images/logo.png';

const Login = () => {
  return (
    <Row>
      <Column col="4" />
      <Column col="4">
        <div className="animated fadeInDown" style={{ marginTop: 100 }}>
          <Row>
            <Column col="12">
              <div
                className="animated fadeInDown ibox-content"
                style={{ border: '1px solid #eee' }}>
                <center>
                  <img
                    className="animated fadeInDown mb-3"
                    style={{ width: '10%' }}
                    src={logo}
                    alt="logo"
                  />
                </center>
                <h3 className="font-bold">
                  <Center>Seja bem-vindo!</Center>
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

export default Login;
