import * as Types from '../utils/actionTypes';
import { notification } from 'antd';
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

  if (values.email === 'admin@admin.com' && values.password === '123') {
    loadAuthentication(true);
    dispatch(loginSetIsLogged(true));
    history.push('/');
  } else {
    notification['error']({
      message: 'Login',
      description: 'Usuário e/ou senha incorretos.',
      className: 'notification-error',
    });
  }

  dispatch(loginSetIsLoading(false));
};
