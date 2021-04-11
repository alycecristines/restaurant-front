import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';

import { Provider } from 'react-redux';
import Main from './components/theme/main';
import store from './store';

import 'moment/locale/pt-br';

ReactDOM.render(
  <ConfigProvider locale={ptBR}>
    <Provider store={store}>
      <Main />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);

reportWebVitals();
