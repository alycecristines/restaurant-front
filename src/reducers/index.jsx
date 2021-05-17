import { combineReducers } from 'redux';

import LoginReducer from './loginReducer';
import CompaniesReducer from './companiesReducer';
import DepartmentsReducer from './departmentsReducer';
import EmployeesReducer from './employeesReducer';
import ProductsReducer from './productsReducer';

const reducers = combineReducers({
  login: LoginReducer,
  companies: CompaniesReducer,
  departments: DepartmentsReducer,
  employees: EmployeesReducer,
  products: ProductsReducer,
});

export default reducers;
