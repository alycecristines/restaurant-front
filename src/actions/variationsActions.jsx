import * as Types from '../utils/actionTypes';
import api from '../services/api';
import { notification } from 'antd';
import swal from 'sweetalert';

export const variationsSetIsLoading = bool => {
  return {
    type: Types.VARIATIONS_IS_LOADING,
    payload: bool,
  };
};

export const variationsSetRecords = value => {
  return {
    type: Types.VARIATIONS_GET_ALL,
    payload: value,
  };
};

export const variationsSetTotalRecords = value => {
  return {
    type: Types.VARIATIONS_TOTAL_RECORDS,
    payload: value,
  };
};

export const variationsSetCurrentPage = value => {
  return {
    type: Types.VARIATIONS_CURRENT_PAGE,
    payload: value,
  };
};

export const variationsSetSearch = value => {
  return {
    type: Types.VARIATIONS_SEARCH,
    payload: value,
  };
};

export const getAllVariations = productId => (dispatch, getState) => {
  dispatch(variationsSetIsLoading(true));

  const { description } = getState().variations.variationsSearch;

  api
    .get(`/variations?IncludeInactivated=true&Description=${description}&ProductId=${productId}`)
    .then(response => {
      dispatch([variationsSetRecords(response?.data?.data), variationsSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar variações',
        description: `${ex}`,
      });
      dispatch(variationsSetIsLoading(false));
    });
};

export const getVariationById = (id, setValues) => dispatch => {
  dispatch(variationsSetIsLoading(true));

  api
    .get(`/variations/${id}`)
    .then(response => {
      dispatch([setValues(response?.data?.data), variationsSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar a variaçao do produto',
        description: `${ex}`,
      });
      dispatch(variationsSetIsLoading(false));
    });
};

export const addVariation = (values, resetForm, setErrors, setSubmitting) => dispatch => {
  dispatch([variationsSetIsLoading(true), setSubmitting(true)]);

  const data = {
    description: values.description,
    productId: values.productId,
  };

  api
    .post('/variations', data)
    .then(() => {
      notification['success']({
        message: 'Variação',
        description: 'Adicionado com sucesso.',
      });

      dispatch([
        getAllVariations(values.productId),
        resetForm(),
        setSubmitting(false),
        variationsSetIsLoading(false),
      ]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);

      notification['error']({
        message: 'Variação',
        description: 'Houve um erro ao tentar adicionar a variação.',
      });

      dispatch([variationsSetIsLoading(false), setSubmitting(false)]);
    });
};

export const updateVariation = (id, values, setErrors, setSubmitting) => dispatch => {
  dispatch([variationsSetIsLoading(true), setSubmitting(true)]);

  api
    .put(`/variations/${id}`, values)
    .then(() => {
      notification['success']({
        message: 'Variação',
        description: 'atualizada com sucesso.',
      });
      dispatch([setSubmitting(false), variationsSetIsLoading(false), getVariationById(id)]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);
      notification['error']({
        message: 'Variação',
        description: 'Ocorreu um erro ao tentar atualizar.',
      });
      dispatch([variationsSetIsLoading(false), setSubmitting(false)]);
    });
};

export const deleteVariation = id => dispatch => {
  swal({
    title: 'Deseja realmente excluir esta variação?',
    text: 'Uma vez excluído, será feito a remoção do cadastro deste item!',
    icon: 'warning',
    buttons: ['Cancelar', 'OK'],
  }).then(willDelete => {
    if (willDelete) {
      dispatch(deleteVariationConfirmed(id));
    }
  });
};

export const deleteVariationConfirmed = id => dispatch => {
  api
    .delete(`/variations/${id}`)
    .then(resp => {
      if (resp.status === 200) {
        swal('Operação realizada com sucesso.', { icon: 'success' });
      }
      dispatch(getAllVariations(id));
    })
    .catch(ex => {
      notification['error']({
        message: 'Variação',
        description: `${ex}`,
      });
    });
};
