/* eslint-disable react/jsx-key */
import { Button, Result, Typography } from 'antd';
import React, { Component } from 'react';

const { Paragraph } = Typography;

class NaoAutorizado extends Component {
  constructor(props) {
    super(props);
  }

  validaLinkVoltar() {
    const voltar = localStorage.getItem('@rest:tipo') === 'Employee' ? '/order-request' : '/';
    return voltar;
  }

  render() {
    return (
      <div id="bg-login">
        <div className="container-error">
          <Result
            status="403"
            title="Acesso Negado"
            subTitle={`Seu acesso não foi autorizado para esta página`}
            extra={[
              <Button type="primary" href={this.validaLinkVoltar()}>
                Voltar
              </Button>,
            ]}>
            <div style={{ textAlign: 'center' }} className="desc">
              <Paragraph>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  O acesso foi negado por um dos motivos abaixo:
                </span>
              </Paragraph>
              <Paragraph>
                <i className="fa fa-times text-danger" />
                {` `}Você não tem permissão para acessar esta tela.
              </Paragraph>
            </div>
          </Result>
        </div>
      </div>
    );
  }
}

export default NaoAutorizado;
