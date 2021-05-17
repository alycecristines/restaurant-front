import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  productIsLoading: false,
  productRecords: [],
  productCurrentPage: 0,
  productTotalRecords: 0,
  productSearch: { description: '', menuId: '' },
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.PRODUCTS_IS_LOADING:
      return { ...state, productIsLoading: action.payload };
    case Types.PRODUCTS_GET_ALL:
      return { ...state, productRecords: action.payload };
    case Types.PRODUCTS_CURRENT_PAGE:
      return { ...state, productCurrentPage: action.payload };
    case Types.PRODUCTS_TOTAL_RECORDS:
      return { ...state, productTotalRecords: action.payload };
    case Types.PRODUCTS_SEARCH:
      return { ...state, productSearch: action.payload };
    default:
      return state;
  }
};
