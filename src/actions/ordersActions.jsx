import * as Types from '../utils/actionTypes';
import api from '../services/api';
import { notification } from 'antd';
import { logOutUser } from './loginActions';
import moment from 'moment';
import { adjustInfo } from '../utils/funcUtils';

export const ordersSetIsLoading = bool => {
  return {
    type: Types.ORDERS_IS_LOADING,
    payload: bool,
  };
};

export const ordersSetRecords = value => {
  return {
    type: Types.ORDERS_GET_ALL,
    payload: value,
  };
};

export const ordersSetRecord = value => {
  return {
    type: Types.ORDERS_GET_BY_ID,
    payload: value,
  };
};

export const ordersSetRecordsNotPrinted = value => {
  return {
    type: Types.ORDERS_GET_ALL_NOT_PRINTED,
    payload: value,
  };
};

export const ordersSetTotalRecords = value => {
  return {
    type: Types.ORDERS_TOTAL_RECORDS,
    payload: value,
  };
};

export const ordersSetCurrentPage = value => {
  return {
    type: Types.ORDERS_CURRENT_PAGE,
    payload: value,
  };
};

export const ordersSetSearch = value => {
  return {
    type: Types.ORDERS_SEARCH,
    payload: value,
  };
};

export const getAllOrders = () => (dispatch, getState) => {
  dispatch(ordersSetIsLoading(true));

  const { createdAt, companyId } = getState().orders.ordersSearch;

  const date = moment().format('YYYY-MM-DD');

  api
    .get(`/orders?IncludePrinted=true&CreatedAt=${date}&CompanyId=${companyId}`)
    .then(response => {
      const { data } = response.data;
      const orders = adjustInfo(data);
      dispatch([ordersSetRecords(orders), ordersSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar pedidos',
        description: `${ex}`,
      });
      dispatch(ordersSetIsLoading(false));
    });
};

export const getAllOrdersNotPrintedAndSetPrinted = () => (dispatch, getState) => {
  dispatch(ordersSetIsLoading(true));

  const { companyId } = getState().orders.ordersSearch;

  const date = moment().format('YYYY-MM-DD');

  api
    .get(`/orders/print?IncludePrinted=true&CreatedAt=${date}&CompanyId=${companyId}`)
    .then(response => {
      const { data } = response.data;
      const orders = adjustInfo(data);
      dispatch([ordersSetRecordsNotPrinted(orders), ordersSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar pedidos não impressos',
        description: `${ex}`,
      });
      dispatch(ordersSetIsLoading(false));
    });
};

export const addOrder = items => dispatch => {
  dispatch(ordersSetIsLoading(true));

  const data = { items };

  api
    .post('/orders', data)
    .then(response => {
      notification['success']({
        message: 'Novo Pedido',
        description: 'Adicionado com sucesso.',
      });

      dispatch(logOutUser());
    })
    .catch(ex => {
      notification['error']({
        message: 'Pedido',
        description: `${ex.title}`,
      });

      dispatch(ordersSetIsLoading(false));
    });
};
