import * as Types from '../utils/actionTypes';
import api from '../services/api';
import { notification } from 'antd';
import swal from 'sweetalert';
import history from '../helpers/history';
import { departmentsSetSearch } from './departmentsActions';
import { employeesSetSearch } from './employeesActions';

export const companiesSetIsLoading = bool => {
  return {
    type: Types.COMPANIES_IS_LOADING,
    payload: bool,
  };
};

export const companiesSetRecords = value => {
  return {
    type: Types.COMPANIES_GET_ALL,
    payload: value,
  };
};

export const companiesSetRecord = value => {
  return {
    type: Types.COMPANIES_GET_BY_ID,
    payload: value,
  };
};

export const companiesSetNextStep = value => {
  return {
    type: Types.COMPANIES_NEXT_STEP,
    payload: value,
  };
};

export const companiesIsDisabledFields = value => {
  return {
    type: Types.COMPANIES_DISABLE_FIELDS,
    payload: value,
  };
};

export const companiesSetTotalRecords = value => {
  return {
    type: Types.COMPANIES_TOTAL_RECORDS,
    payload: value,
  };
};

export const companiesSetCurrentPage = value => {
  return {
    type: Types.COMPANIES_CURRENT_PAGE,
    payload: value,
  };
};

export const companiesSetSearch = value => {
  return {
    type: Types.COMPANIES_SEARCH,
    payload: value,
  };
};

export const getAllCompanies = () => (dispatch, getState) => {
  dispatch(companiesSetIsLoading(true));

  const { name, registrationNumber } = getState().companies.companiesSearch;

  api
    .get(
      `/companies?IncludeInactivated=true&IncludeDeleted=false&Name=${name}&RegistrationNumber=${registrationNumber}`,
    )
    .then(response => {
      const { data } = response.data;
      dispatch([companiesSetRecords(data), companiesSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar empresas',
        description: `${ex}`,
      });
      dispatch(companiesSetIsLoading(false));
    });
};

export const getCompanyById = (id, setValues) => dispatch => {
  dispatch(companiesSetIsLoading(true), departmentsSetSearch({ companyId: id }));

  api
    .get(`/companies/${id}`)
    .then(response => {
      dispatch([
        setValues(response?.data?.data),
        companiesSetRecord(response?.data?.data),
        companiesSetIsLoading(false),
      ]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar a empresa',
        description: `${ex}`,
      });
      dispatch(companiesSetIsLoading(false));
    });
};

export const addCompany = (values, setErrors, setSubmitting) => dispatch => {
  dispatch([companiesSetIsLoading(true), setSubmitting(true)]);

  api
    .post('/companies', values)
    .then(response => {
      notification['success']({
        message: 'Empresa',
        description: 'Adicionada com sucesso.',
      });

      dispatch([
        companiesSetRecord(response?.data?.data),
        departmentsSetSearch({ description: '', companyId: response?.data?.data?.id }),
        employeesSetSearch({
          name: '',
          email: '',
          departmentId: '',
          companyId: response?.data?.data?.id,
        }),
        companiesSetNextStep(true),
        companiesIsDisabledFields(true),
        setSubmitting(false),
        companiesSetIsLoading(false),
      ]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);

      notification['error']({
        message: 'Empresa',
        description: 'Houve um erro ao tentar adicionar a empresa.',
      });

      dispatch([companiesSetIsLoading(false), setSubmitting(false)]);
    });
};

export const updateCompany = (id, values, setErrors, setSubmitting) => dispatch => {
  dispatch([companiesSetIsLoading(true), setSubmitting(true)]);

  api
    .put(`/companies/${id}`, values)
    .then(() => {
      notification['success']({
        message: 'Empresa',
        description: 'atualizada com sucesso.',
      });
      dispatch([setSubmitting(false), companiesSetIsLoading(false)]);
      history.push('/companies');
    })
    .catch(ex => {
      ex && setErrors(ex.errors);
      notification['error']({
        message: 'Empresa',
        description: 'Ocorreu um erro ao tentar atualizar.',
      });
      dispatch([companiesSetIsLoading(false), setSubmitting(false)]);
    });
};

export const deleteCompany = id => dispatch => {
  swal({
    title: 'Deseja realmente excluir esta empresa?',
    text: 'Uma vez excluído, será feito a remoção do cadastro deste item!',
    icon: 'warning',
    buttons: ['Cancelar', 'OK'],
  }).then(willDelete => {
    if (willDelete) {
      dispatch(deleteCopmanyConfirmed(id));
    }
  });
};

export const deleteCopmanyConfirmed = id => dispatch => {
  api
    .delete(`/companies/${id}`)
    .then(resp => {
      if (resp.status === 200) {
        swal('Operação realizada com sucesso.', { icon: 'success' });
      }
      dispatch(getAllCompanies());
    })
    .catch(ex => {
      notification['error']({
        message: 'Empresa',
        description: `${ex}`,
      });
    });
};
