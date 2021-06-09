import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  ordersIsLoading: false,
  ordersRecords: [],
  ordersRecord: {},
  ordersCurrentPage: 0,
  ordersTotalRecords: 0,
  ordersSearch: { createdAt: '', companyId: '' },
  ordersRecordsNotPrinted: [],
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.ORDERS_IS_LOADING:
      return { ...state, ordersIsLoading: action.payload };
    case Types.ORDERS_GET_ALL:
      return { ...state, ordersRecords: action.payload };
    case Types.ORDERS_GET_BY_ID:
      return { ...state, ordersRecord: action.payload };
    case Types.ORDERS_CURRENT_PAGE:
      return { ...state, ordersCurrentPage: action.payload };
    case Types.ORDERS_TOTAL_RECORDS:
      return { ...state, ordersTotalRecords: action.payload };
    case Types.ORDERS_SEARCH:
      return { ...state, ordersSearch: action.payload };
    case Types.ORDERS_GET_ALL_NOT_PRINTED:
      return { ...state, ordersRecordsNotPrinted: action.payload };
    default:
      return state;
  }
};
