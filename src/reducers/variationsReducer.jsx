import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  variationsIsLoading: false,
  variationsRecords: [],
  variationsCurrentPage: 0,
  variationsTotalRecords: 0,
  variationsSearch: { description: '', productId: '' },
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.VARIATIONS_IS_LOADING:
      return { ...state, variationsIsLoading: action.payload };
    case Types.VARIATIONS_GET_ALL:
      return { ...state, variationsRecords: action.payload };
    case Types.VARIATIONS_CURRENT_PAGE:
      return { ...state, variationsCurrentPage: action.payload };
    case Types.VARIATIONS_TOTAL_RECORDS:
      return { ...state, variationsTotalRecords: action.payload };
    case Types.VARIATIONS_SEARCH:
      return { ...state, variationsSearch: action.payload };
    default:
      return state;
  }
};
