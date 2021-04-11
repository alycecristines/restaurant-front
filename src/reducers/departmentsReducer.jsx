import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  departmentIsLoading: false,
  departmentRecords: [],
  departmentCurrentPage: 0,
  departmentTotalRecords: 0,
  departmentSearch: { description: '', companyId: '' },
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.DEPARTMENTS_IS_LOADING:
      return { ...state, departmentIsLoading: action.payload };
    case Types.DEPARTMENTS_GET_ALL:
      return { ...state, departmentRecords: action.payload };
    case Types.DEPARTMENTS_CURRENT_PAGE:
      return { ...state, departmentCurrentPage: action.payload };
    case Types.DEPARTMENTS_TOTAL_RECORDS:
      return { ...state, departmentTotalRecords: action.payload };
    case Types.DEPARTMENTS_SEARCH:
      return { ...state, departmentSearch: action.payload };
    default:
      return state;
  }
};
