import { combineReducers } from 'redux';

import LoginReducer from './loginReducer';
import CompaniesReducer from './companiesReducer';
import DepartmentsReducer from './departmentsReducer';
import EmployeesReducer from './employeesReducer';

const reducers = combineReducers({
  login: LoginReducer,
  companies: CompaniesReducer,
  departments: DepartmentsReducer,
  employees: EmployeesReducer,
});

export default reducers;
