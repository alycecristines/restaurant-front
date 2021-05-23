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

export const loadAuthentication = async token => {
  localStorage.setItem('@rest:token', token);
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
      loadAuthentication(response?.data?.data?.token);
      dispatch([loginSetIsLogged(true), loginSetIsLoading(false)]);
      history.push('/');
    })
    .catch(() => {
      notification['error']({
        message: 'Login',
        description: 'Usuário e/ou senha incorretos.',
        className: 'notification-error',
      });
      dispatch(loginSetIsLoading(false));
    });
};
