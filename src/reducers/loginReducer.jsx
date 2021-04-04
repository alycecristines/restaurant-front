import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  loginIsLoading: false,
  isLogged: false,
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.LOGIN_IS_LOADING:
      return { ...state, loginIsLoading: action.payload };
    case Types.LOGIN_SET_LOGGED:
      return { ...state, isLogged: action.payload };
    default:
      return state;
  }
};
