import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  employeeIsLoading: false,
  employeeRecords: [],
  employeeCurrentPage: 0,
  employeeTotalRecords: 0,
  employeeSearch: { name: '', email: '', departmentId: '', companyId: '' },
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.EMPLOYEES_IS_LOADING:
      return { ...state, employeeIsLoading: action.payload };
    case Types.DEPARTMENTS_GET_ALL:
      return { ...state, employeeRecords: action.payload };
    case Types.EMPLOYEES_CURRENT_PAGE:
      return { ...state, employeeCurrentPage: action.payload };
    case Types.EMPLOYEES_TOTAL_RECORDS:
      return { ...state, employeeTotalRecords: action.payload };
    case Types.EMPLOYEES_SEARCH:
      return { ...state, employeeSearch: action.payload };
    default:
      return state;
  }
};
