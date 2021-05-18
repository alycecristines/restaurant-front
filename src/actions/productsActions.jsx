import * as Types from '../utils/actionTypes';
import api from '../services/api';
import { notification } from 'antd';
import swal from 'sweetalert';

export const productsSetIsLoading = bool => {
  return {
    type: Types.PRODUCTS_IS_LOADING,
    payload: bool,
  };
};

export const productsSetRecords = value => {
  return {
    type: Types.PRODUCTS_GET_ALL,
    payload: value,
  };
};

export const productsSetTotalRecords = value => {
  return {
    type: Types.PRODUCTS_TOTAL_RECORDS,
    payload: value,
  };
};

export const productsSetCurrentPage = value => {
  return {
    type: Types.PRODUCTS_CURRENT_PAGE,
    payload: value,
  };
};

export const productsSetSearch = value => {
  return {
    type: Types.PRODUCTS_SEARCH,
    payload: value,
  };
};

export const getAllProducts = () => (dispatch, getState) => {
  dispatch(productsSetIsLoading(true));

  const { description, menuId } = getState().products.productSearch;

  api
    .get(`/products?IncludeInactivated=true&Description=${description}&MenuId=${menuId}`)
    .then(response => {
      dispatch([productsSetRecords(response?.data?.data), productsSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar produtos',
        description: `${ex}`,
      });
      dispatch(productsSetIsLoading(false));
    });
};

export const getProductById = (id, setValues) => dispatch => {
  dispatch(productsSetIsLoading(true));

  api
    .get(`/products/${id}`)
    .then(response => {
      dispatch([setValues(response?.data?.data), productsSetIsLoading(false)]);
    })
    .catch(ex => {
      notification['error']({
        message: 'Erro ao buscar o produto',
        description: `${ex}`,
      });
      dispatch(productsSetIsLoading(false));
    });
};

export const addProduct = (values, resetForm, setErrors, setSubmitting) => dispatch => {
  dispatch([productsSetIsLoading(true), setSubmitting(true), getAllProducts()]);

  const data = {
    description: values.description,
  };

  api
    .post('/products', data)
    .then(() => {
      notification['success']({
        message: 'Produto',
        description: 'Adicionado com sucesso.',
      });

      dispatch([
        resetForm(),
        setSubmitting(false),
        productsSetIsLoading(false),
        getAllProducts(),
      ]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);

      notification['error']({
        message: 'Produto',
        description: 'Houve um erro ao tentar adicionar o produto.',
      });

      dispatch([productsSetIsLoading(false), setSubmitting(false)]);
    });
};

export const updateProduct = (id, values, setErrors, setSubmitting) => dispatch => {
  dispatch([productsSetIsLoading(true), setSubmitting(true)]);

  api
    .put(`/products/${id}`, values)
    .then(() => {
      notification['success']({
        message: 'Produto',
        description: 'atualizado com sucesso.',
      });
      dispatch([setSubmitting(false), productsSetIsLoading(false), getProductById(id, () => {})]);
    })
    .catch(ex => {
      ex && setErrors(ex.errors);
      notification['error']({
        message: 'Produto',
        description: 'Ocorreu um erro ao tentar atualizar.',
      });
      dispatch([productsSetIsLoading(false), setSubmitting(false)]);
    });
};

export const deleteProduct = id => dispatch => {
  swal({
    title: 'Deseja realmente excluir este produto?',
    text: 'Uma vez excluído, será feito a remoção do cadastro deste item!',
    icon: 'warning',
    buttons: ['Cancelar', 'OK'],
  }).then(willDelete => {
    if (willDelete) {
      dispatch(deleteProductConfirmed(id));
    }
  });
};

export const deleteProductConfirmed = id => dispatch => {
  api
    .delete(`/products/${id}`)
    .then(resp => {
      if (resp.status === 200) {
        swal('Operação realizada com sucesso.', { icon: 'success' });
      }
      dispatch(getAllProducts());
    })
    .catch(ex => {
      notification['error']({
        message: 'Produto',
        description: `${ex}`,
      });
    });
};
