import * as Types from '../utils/actionTypes';

const INICIAL_STATE = {
  loginIsLoading: false,
  isLogged: false,
  emailUsed: '',
  tokenUsed: '',
  userType: '',
};

export default (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case Types.LOGIN_IS_LOADING:
      return { ...state, loginIsLoading: action.payload };
    case Types.LOGIN_SET_LOGGED:
      return { ...state, isLogged: action.payload };
    case Types.LOGIN_EMAIL_USED:
      return { ...state, emailUsed: action.payload };
    case Types.LOGIN_TOKEN_USED:
      return { ...state, tokenUsed: action.payload };
    case Types.LOGIN_USER_TYPE:
      return { ...state, userType: action.payload };
    default:
      return state;
  }
};
