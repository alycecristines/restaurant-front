import * as Types from '../utils/actionTypes';
import api from '../services/api';
import { notification } from 'antd';
import swal from 'sweetalert';

export const departmentsSetIsLoading = bool => {
  return {
    type: Types.DEPARTMENTS_IS_LOADING,
    payload: bool,
  };
};

export const departmentsSetRecords = value => {
  return {
    type: Types.DEPARTMENTS_GET_ALL,
    payload: value,
  };
};

export const departmentsSetTotalRecords = value => {
  return {
    type: Types.DEPARTMENTS_TOTAL_RECORDS,
    payload: value,
  };
};

export const departmentsSetCurrentPage = value => {
  return {
    type: Types.DEPARTMENTS_CURRENT_PAGE,
    payload: value,
  };
};

export const departmentsSetSearch = value => {
  return {
    type: Types.DEPARTMENTS_SEARCH,
    payload: value,
  };
};

export const getAllDepartments = () => (dispatch, getState) => {
  dispatch(departmentsSetIsLoading(true));

  const { description, companyId } = getState().departments.departmentSearch;

  api
    .get(
      `/departments?IncludeInactivated=true&IncludeDeleted=false&Description=${description}&CompanyId=${companyId}`,
    )
    .then(response => {
      dispatch([departmentsSetRecords(response?.data?.data), departmentsSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar departamentos',
        description: `${ex}`,
      });
      dispatch(departmentsSetIsLoading(false));
    });
};

export const getDepartmentById = (id, setValues) => dispatch => {
  dispatch(departmentsSetIsLoading(true));

  api
    .get(`/departments/${id}`)
    .then(response => {
      dispatch([setValues(response?.data?.data), departmentsSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar o departamento',
        description: `${ex}`,
      });
      dispatch(departmentsSetIsLoading(false));
    });
};

export const addDepartment = (values, resetForm, setErrors, setSubmitting) => (
  dispatch,
  getState,
) => {
  dispatch([departmentsSetIsLoading(true), setSubmitting(true), getAllDepartments()]);

  const { companyId } = getState().departments.departmentSearch;

  const data = {
    description: values.description,
    companyId: companyId,
  };

  api
    .post('/departments', data)
    .then(() => {
      notification['success']({
        message: 'Departamento',
        description: 'Adicionado com sucesso.',
      });

      dispatch([
        resetForm(),
        setSubmitting(false),
        departmentsSetIsLoading(false),
        getAllDepartments(),
      ]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);

      notification['error']({
        message: 'Departamento',
        description: 'Houve um erro ao tentar adicionar o departamento.',
      });

      dispatch([departmentsSetIsLoading(false), setSubmitting(false)]);
    });
};

export const updateDepartment = (id, values, setErrors, setSubmitting) => dispatch => {
  dispatch([departmentsSetIsLoading(true), setSubmitting(true)]);

  api
    .put(`/departments/${id}`, values)
    .then(() => {
      notification['success']({
        message: 'Departamento',
        description: 'atualizado com sucesso.',
      });
      dispatch([setSubmitting(false), departmentsSetIsLoading(false), getDepartmentById(id)]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);
      notification['error']({
        message: 'Departamento',
        description: 'Ocorreu um erro ao tentar atualizar.',
      });
      dispatch([departmentsSetIsLoading(false), setSubmitting(false)]);
    });
};

export const deleteDepartment = id => dispatch => {
  swal({
    title: 'Deseja realmente excluir este departamento?',
    text: 'Uma vez excluído, será feito a remoção do cadastro deste item!',
    icon: 'warning',
    buttons: ['Cancelar', 'OK'],
  }).then(willDelete => {
    if (willDelete) {
      dispatch(deleteDepartmentConfirmed(id));
    }
  });
};

export const deleteDepartmentConfirmed = id => dispatch => {
  api
    .delete(`/departments/${id}`)
    .then(resp => {
      if (resp.status === 200) {
        swal('Operação realizada com sucesso.', { icon: 'success' });
      }
      dispatch(getAllDepartments());
    })
    .catch(ex => {
      notification['error']({
        message: 'Departamento',
        description: `${ex}`,
      });
    });
};
