import * as Types from '../utils/actionTypes';
import api from '../services/api';
import { notification } from 'antd';
import swal from 'sweetalert';

export const employeesSetIsLoading = bool => {
  return {
    type: Types.EMPLOYEES_IS_LOADING,
    payload: bool,
  };
};

export const employeesSetRecords = value => {
  return {
    type: Types.EMPLOYEES_GET_ALL,
    payload: value,
  };
};

export const employeesSetTotalRecords = value => {
  return {
    type: Types.EMPLOYEES_TOTAL_RECORDS,
    payload: value,
  };
};

export const employeesSetCurrentPage = value => {
  return {
    type: Types.EMPLOYEES_CURRENT_PAGE,
    payload: value,
  };
};

export const employeesSetSearch = value => {
  return {
    type: Types.EMPLOYEES_SEARCH,
    payload: value,
  };
};

export const getAllEmployees = () => (dispatch, getState) => {
  dispatch(employeesSetIsLoading(true));

  const { name, email, departmentId, companyId } = getState().employees.employeeSearch;

  api
    .get(
      `/employees?IncludeInactivated=true&IncludeDeleted=false&Name=${name}&Email=${email}&CompanyId=${companyId}&DepartmentId=${departmentId}`,
    )
    .then(response => {
      dispatch([employeesSetRecords(response?.data?.data), employeesSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar colaboradores',
        description: `${ex}`,
      });
      dispatch(employeesSetIsLoading(false));
    });
};

export const getEmployeeById = (id, setValues) => dispatch => {
  dispatch(employeesSetIsLoading(true));

  api
    .get(`/employees/${id}`)
    .then(response => {
      dispatch([setValues(response?.data?.data), employeesSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar o colaborador',
        description: `${ex}`,
      });
      dispatch(employeesSetIsLoading(false));
    });
};

export const addEmployee = (
  values,
  resetForm = () => {},
  setErrors = () => {},
  setSubmitting = () => {},
) => dispatch => {
  dispatch([employeesSetIsLoading(true), setSubmitting(true)]);

  api
    .post('/employees', values)
    .then(() => {
      notification['success']({
        message: 'Colaborador',
        description: 'Adicionado com sucesso.',
      });

      dispatch([
        resetForm(),
        setSubmitting(false),
        employeesSetIsLoading(false),
        getAllEmployees(),
      ]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);

      notification['error']({
        message: 'Colaborador',
        description: 'Houve um erro ao tentar adicionar o colaborador.',
      });

      dispatch([employeesSetIsLoading(false), setSubmitting(false)]);
    });
};

export const updateEmployee = (id, values, setErrors, setSubmitting) => dispatch => {
  dispatch([employeesSetIsLoading(true), setSubmitting(true)]);

  api
    .put(`/employees/${id}`, values)
    .then(() => {
      notification['success']({
        message: 'Colaborador',
        description: 'atualizado com sucesso.',
      });
      dispatch([setSubmitting(false), employeesSetIsLoading(false), getEmployeeById(id)]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);
      notification['error']({
        message: 'Colaborador',
        description: 'Ocorreu um erro ao tentar atualizar.',
      });
      dispatch([employeesSetIsLoading(false), setSubmitting(false)]);
    });
};

export const deleteEmployee = id => dispatch => {
  swal({
    title: 'Deseja realmente excluir este colaborador?',
    text: 'Uma vez excluído, será feito a remoção do cadastro deste item!',
    icon: 'warning',
    buttons: ['Cancelar', 'OK'],
  }).then(willDelete => {
    if (willDelete) {
      dispatch(deleteEmployeeConfirmed(id));
    }
  });
};

export const deleteEmployeeConfirmed = id => dispatch => {
  api
    .delete(`/employees/${id}`)
    .then(resp => {
      if (resp.status === 200) {
        swal('Operação realizada com sucesso.', { icon: 'success' });
      }
      dispatch(getAllEmployees());
    })
    .catch(ex => {
      notification['error']({
        message: 'Colaborador',
        description: `${ex}`,
      });
    });
};
