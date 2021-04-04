import * as Types from '../utils/actionTypes';

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
  sessionStorage.setItem('@rest:token', token);
};

export const logOutUser = () => {
  sessionStorage.removeItem('@rest:token');
};
