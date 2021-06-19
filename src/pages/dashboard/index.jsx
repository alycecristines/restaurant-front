import React, { Suspense, useEffect } from 'react';

import { Row } from '../../components/bootstrap';
import Box from '../../components/theme/box';
import Content from '../../components/theme/content';
import Header from '../../components/theme/header';

const Dashboard = () => {
  useEffect(() => {}, []);

  return (
    <Suspense
      fallback={
        <div>
          <br />
          Carregando...
        </div>
      }>
      <Header title="Dashboard"></Header>
      <div>
        <Content>
          <Row>
            <Box
              col="6"
              description="Quantidade Pedidos"
              title="Período Diário"
              amount={`230`}
              amountDescription="Total"
            />
            <Box
              col="6"
              description="Quantidade Impressos"
              title="Período Diário"
              amount={`185`}
              amountDescription="Total"
            />
          </Row>
        </Content>
      </div>
    </Suspense>
  );
};

export default Dashboard;
