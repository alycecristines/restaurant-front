import { combineReducers } from 'redux';

import LoginReducer from './loginReducer';
import CompaniesReducer from './companiesReducer';
import DepartmentsReducer from './departmentsReducer';
import EmployeesReducer from './employeesReducer';
import ProductsReducer from './productsReducer';
import VariationsReducer from './variationsReducer';

const reducers = combineReducers({
  login: LoginReducer,
  companies: CompaniesReducer,
  departments: DepartmentsReducer,
  employees: EmployeesReducer,
  products: ProductsReducer,
  variations: VariationsReducer,
});

export default reducers;
