import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  companiesIsLoading: false,
  companiesRecords: [],
  companiesRecord: {},
  companiesCurrentPage: 0,
  companiesTotalRecords: 0,
  companiesSearch: { name: '', registrationNumber: '' },
  companiesNextStep: false,
  companiesDisableFields: false,
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.COMPANIES_IS_LOADING:
      return { ...state, companiesIsLoading: action.payload };
    case Types.COMPANIES_GET_ALL:
      return { ...state, companiesRecords: action.payload };
    case Types.COMPANIES_GET_BY_ID:
      return { ...state, companiesRecord: action.payload };
    case Types.COMPANIES_CURRENT_PAGE:
      return { ...state, companiesCurrentPage: action.payload };
    case Types.COMPANIES_TOTAL_RECORDS:
      return { ...state, companiesTotalRecords: action.payload };
    case Types.COMPANIES_SEARCH:
      return { ...state, companiesSearch: action.payload };
    case Types.COMPANIES_NEXT_STEP:
      return { ...state, companiesNextStep: action.payload };
    case Types.COMPANIES_DISABLE_FIELDS:
      return { ...state, companiesDisableFields: action.payload };
    default:
      return state;
  }
};
