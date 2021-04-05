import React from 'react';
import { Column, Row } from '../../components/bootstrap';
import logo from '../../images/logo.png';
import Form from './form';

const NewPassword = () => {
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

export default NewPassword;
