import * as Types from '../utils/actionTypes';
import { notification } from 'antd';
import api from '../services/api';
import history from '../helpers/history';

export const loginSetIsLoading = bool => {
  return {
    type: Types.LOGIN_IS_LOADING,
    payload: bool,
  };
};

export const loginSetIsLogged = bool => {
  return {
    type: Types.LOGIN_SET_LOGGED,
    payload: bool,
  };
};

export const setEmailUsed = value => {
  return {
    type: Types.LOGIN_EMAIL_USED,
    payload: value,
  };
};

export const setTokenUsed = value => {
  return {
    type: Types.LOGIN_TOKEN_USED,
    payload: value,
  };
};

export const setUserType = value => {
  return {
    type: Types.LOGIN_USER_TYPE,
    payload: value,
  };
};

export const loadAuthentication = async (token, type) => {
  localStorage.setItem('@rest:token', token);
  localStorage.setItem('@rest:tipo', type);
};

export const logOutUser = () => dispatch => {
  localStorage.clear();
  dispatch(loginSetIsLogged(false));
  history.push('/login');
};

export const loginUser = values => dispatch => {
  dispatch(loginSetIsLoading(true));

  const data = {
    userName: values.email,
    password: values.password,
  };

  api
    .post(`accounts/sign-in`, data)
    .then(response => {
      const type =
        response?.data?.data?.user?.name === 'Administrator' ? 'Administrator' : 'Employee';
      loadAuthentication(response?.data?.data?.token, type);
      dispatch([setUserType(type), loginSetIsLogged(true), loginSetIsLoading(false)]);

      if (type === 'Employee') {
        history.push('/order-request');
      } else history.push('/orders');
    })
    .catch(ex => {
      notification['error']({
        message: 'Login',
        description: `${ex.title}`,
        className: 'notification-error',
      });
      dispatch(loginSetIsLoading(false));
    });
};

export const forgotPassword = values => dispatch => {
  dispatch(loginSetIsLoading(true));

  const data = {
    userName: values.email,
  };

  api
    .post(`accounts/forgot-password`, data)
    .then(() => {
      dispatch([setEmailUsed(values.email), loginSetIsLoading(false)]);
      history.push('/validate-code');
    })
    .catch(() => {
      notification['error']({
        message: 'Login',
        description: 'Usuário não encontrado.',
        className: 'notification-error',
      });
      dispatch(loginSetIsLoading(false));
    });
};

export const validateCode = values => (dispatch, getState) => {
  dispatch(loginSetIsLoading(true));

  const { emailUsed } = getState().login;

  const data = {
    userName: emailUsed,
    token: values.validationCode,
  };

  api
    .post(`accounts/verify-token`, data)
    .then(() => {
      dispatch([setTokenUsed(values.validationCode), loginSetIsLoading(false)]);
      history.push('/new-password');
    })
    .catch(() => {
      notification['error']({
        message: 'Login',
        description: 'Código de verificação inválido.',
        className: 'notification-error',
      });
      dispatch(loginSetIsLoading(false));
    });
};

export const defineNewPassword = values => (dispatch, getState) => {
  dispatch(loginSetIsLoading(true));

  const { emailUsed, tokenUsed } = getState().login;

  const data = {
    userName: emailUsed,
    token: tokenUsed,
    password: values.password,
  };

  api
    .post(`accounts/reset-password`, data)
    .then(() => {
      dispatch([loginSetIsLoading(false), setEmailUsed(''), setTokenUsed('')]);
      history.push('/login');
    })
    .catch(ex => {
      notification['error']({
        message: 'Login',
        description: `${ex.title}`,
        className: 'notification-error',
      });
      dispatch(loginSetIsLoading(false));
    });
};
