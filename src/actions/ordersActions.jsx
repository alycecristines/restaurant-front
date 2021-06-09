import * as Types from '../utils/actionTypes';
import api from '../services/api';
import { notification } from 'antd';

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

  api
    .get(`/orders?IncludePrinted=true&CreatedAt=${createdAt}&CompanyId=${companyId}`)
    .then(response => {
      const { data } = response.data;
      dispatch([ordersSetRecords(data), ordersSetIsLoading(false)]);
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

  const { createdAt, companyId } = getState().orders.ordersSearch;

  api
    .get(`/orders/print?IncludePrinted=true&CreatedAt=${createdAt}&CompanyId=${companyId}`)
    .then(response => {
      const { data } = response.data;
      dispatch([ordersSetRecordsNotPrinted(data), ordersSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar pedidos não impressos',
        description: `${ex}`,
      });
      dispatch(ordersSetIsLoading(false));
    });
};

// export const addOrder = (values, setErrors, setSubmitting) => dispatch => {
//   dispatch([companiesSetIsLoading(true), setSubmitting(true)]);

//   api
//     .post('/companies', values)
//     .then(response => {
//       notification['success']({
//         message: 'Empresa',
//         description: 'Adicionada com sucesso.',
//       });

//       dispatch([
//         companiesSetRecord(response?.data?.data),
//         departmentsSetSearch({ description: '', companyId: response?.data?.data?.id }),
//         employeesSetSearch({
//           name: '',
//           email: '',
//           departmentId: '',
//           companyId: response?.data?.data?.id,
//         }),
//         companiesSetNextStep(true),
//         companiesIsDisabledFields(true),
//         setSubmitting(false),
//         companiesSetIsLoading(false),
//       ]);
//     })
//     .catch(ex => {
//       ex && setErrors(ex.errors);

//       notification['error']({
//         message: 'Empresa',
//         description: 'Houve um erro ao tentar adicionar a empresa.',
//       });

//       dispatch([companiesSetIsLoading(false), setSubmitting(false)]);
//     });
// };
